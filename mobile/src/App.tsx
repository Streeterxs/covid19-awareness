import React, { Suspense, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { RelayEnvironmentProvider, useLazyLoadQuery, useMutation } from 'react-relay/hooks';
import { graphql } from 'react-relay';

import environment from './Relay/environment';
import { Map } from './Components';
import { covidPositionModule } from './Services/covidPosition';
import { CovidPosition, CovidPositionCertain } from './Services/covidPosition/covidPosition';
import { AppMyCovidPositionQuery } from './__generated__/AppMyCovidPositionQuery.graphql';
import { AppNewCovidPositionMutation } from './__generated__/AppNewCovidPositionMutation.graphql';
import { AppAllCovidPositionsButMeQuery } from './__generated__/AppAllCovidPositionsButMeQuery.graphql';
import { covidPositionsSubscriptionModule } from './Services/subscriptions';

declare const global: {HermesInternal: null | {}};

const myCovidPositionQuery = graphql`
  query AppMyCovidPositionQuery {
    myCovidPosition  {
      lat
      lon
      device
      covidSituation
      createdAt
      updatedAt
    }
  }
`;

const allCovidPositionsButMeQuery = graphql`
  query AppAllCovidPositionsButMeQuery {
    allCovidPositionsButMe {
      edges {
        node {
          id
          covidSituation
          lat
          lon
          device
          createdAt
          updatedAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const newCovidPositionMutation = graphql`
  mutation AppNewCovidPositionMutation($device: String!, $covidSituation: String!, $lat: Float!, $lon: Float!) {
    NewCovidPosition(input: {device: $device, covidSituation: $covidSituation, lat: $lat, lon: $lon, clientMutationId: "1"}) {
      createdCovidPosition {
        lat
        lon
        device
        covidSituation
        createdAt
        updatedAt
      }
    }
  }
`;

const {
  initialHandler,
  covidPositionHandler,
  covidSituationHandler,
  stopWatchLocation,
  isWatching } = covidPositionModule();

const positionsSubscriptionModule = covidPositionsSubscriptionModule();

const App = () => {
  // New Position Mutation
  const [newCovidPositionCommit, newCovidPositionIsInFlight] = useMutation<AppNewCovidPositionMutation>(newCovidPositionMutation);

  const {myCovidPosition} = useLazyLoadQuery<AppMyCovidPositionQuery>(myCovidPositionQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {allCovidPositionsButMe} = useLazyLoadQuery<AppAllCovidPositionsButMeQuery>(allCovidPositionsButMeQuery, {}, {
    fetchPolicy: 'store-or-network'
  });
  

  const commitNewPosition = (covidPositionObj: CovidPositionCertain) => {
    newCovidPositionCommit({
      variables: {...covidPositionObj},
      onCompleted: (response) => {
        console.log('response: ', response);
      },
      onError: (err) => {
        console.log('err: ', err);
      }
    });
  }

  useEffect(() => {
    positionsSubscriptionModule.subscribe();

    initialHandler(commitNewPosition, myCovidPosition);

    return () => {
      stopWatchLocation();
      positionsSubscriptionModule.dispose();
    }
  }, [])

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text>Testando testes s</Text>
            </View>
          )}
          <View style={styles.body}>
            <Map
              myPosition={myCovidPosition}
              otherCovidPositions={
                allCovidPositionsButMe &&
                allCovidPositionsButMe?.edges ?
                allCovidPositionsButMe.edges.map((edge, index) => edge?.node as CovidPosition) :
                []}
              situationUpdate={() => {
                if(!isWatching() && myCovidPosition) {
                  covidSituationHandler((covidObj) => covidPositionHandler(commitNewPosition, covidObj), myCovidPosition as CovidPosition);

                  return;
                }
                covidSituationHandler(commitNewPosition, myCovidPosition);

              }}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const AppRoot = () => {

  const fallback = (
    <Text>
      Loading...
    </Text>
  )
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={fallback}>
        <App/>
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AppRoot;
