/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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

declare const global: {HermesInternal: null | {}};

const myCovidPositionQuery = graphql`
  query AppMyCovidPositionQuery {
    myCovidPosition  {
      lat
      lon
      covidSituation
      createdAt
      updatedAt
    }
  }
`;

const newCovidPositionMutation = graphql`
  mutation AppNewCovidPositionMutation($device: String!, $covidSituation: String!, $lat: Float!, $lon: Float!) {
    NewCovidPosition(input: {device: $device, covidSituation: $covidSituation, lat: $lat, lon: $lon, clientMutationId: "1"}) {
      createdCovidPosition {
        lat
        lon
        covidSituation
        createdAt
        updatedAt
      }
    }
  }
`;

export type CovidPosition = {
  device: string;
  covidSituation: string;
  lat: number;
  lon: number;
};
const App = () => {
  // New Position Mutation
  const [newCovidPositionCommit, newCovidPositionIsInFlight] = useMutation(newCovidPositionMutation);

  const {myCovidPosition}: any = useLazyLoadQuery(myCovidPositionQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {
    initialHandler,
    covidPositionHandler,
    covidSituationHandler,
    deviceHandler,
    stopWatchLocation,
    isWatching } = covidPositionModule();

  const commitNewPosition = (covidPositionObj: CovidPosition) => {
    newCovidPositionCommit({
      variables: {...covidPositionObj},
      onCompleted: (teste) => {
        console.log(teste);
      }
    });
  }

  useEffect(() => {

    initialHandler(commitNewPosition, myCovidPosition);

    return () => {
      stopWatchLocation();
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
            <Map myPosition={myCovidPosition} otherCovidPositions={[]} situationUpdate={() => {

                if(!isWatching) {
                  covidSituationHandler((covidObj) => covidPositionHandler(commitNewPosition, covidObj), myCovidPosition);

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
