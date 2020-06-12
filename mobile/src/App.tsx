/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Suspense, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { RelayEnvironmentProvider, useLazyLoadQuery, useMutation } from 'react-relay/hooks';
import { graphql } from 'react-relay';

import environment from './Relay/environment';
import {geolocationModule, dialogModule} from './Services';
import { Map } from './Components';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

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
const App = ({device}: {device: string}) => {
  // New Position Mutation
  const [newCovidPositionCommit, newCovidPositionIsInFlight] = useMutation(newCovidPositionMutation);
  const {showDialogAndroid} = dialogModule();

  const {myCovidPosition}: any = useLazyLoadQuery(myCovidPositionQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {watchLocation, stopWatchLocation, isWatching} = geolocationModule();

  const covidSituationHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {

    showDialogAndroid((covidSituationReturned) => {

      let covidPositionCopy = {
        ...covidPositionObj,
        covidSituation: covidSituationReturned
      };

      callback(covidPositionCopy);
      return;
  
    });

  };

  const covidPositionHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {

    watchLocation((watchPosition) => {

      let covidPositionCopy = {
        ...covidPositionObj,
        lat: watchPosition.coords.latitude,
        lon: watchPosition.coords.longitude
      };

      callback(covidPositionCopy);
      return;
    });
  };

  const commitNewPosition = (covidPositionObj: CovidPosition) => {
    newCovidPositionCommit({
      variables: {...covidPositionObj},
      onCompleted: (teste) => {
        console.log(teste);
      }
    })
  }

  useEffect(() => {

    console.log('myCovidPosition: ', myCovidPosition);
    let covidPositionObj: CovidPosition = {
      ...myCovidPosition,
      device
    };
    covidSituationHandler((covidObj) => covidPositionHandler(commitNewPosition, covidObj), covidPositionObj);

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
            <Map position={myCovidPosition} situationUpdate={() => {

                if(!isWatching) {

                  let covidPositionObj = {
                    ...myCovidPosition
                  };
                  covidSituationHandler((covidObj) => covidPositionHandler(commitNewPosition, covidObj), covidPositionObj);

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
  const [device, setDevice] = useState<string>(getUniqueId());

  useEffect(() => {
    const asyncStorageHandler = async () => {
      const myIdentifier = await AsyncStorage.getItem('identifier');
  
      if(!myIdentifier) {
        await AsyncStorage.setItem('identifier', device);
        return;
      }
    };

    asyncStorageHandler();

  }, []);

  const fallback = (
    <Text>
      Loading...
    </Text>
  )
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={fallback}>
        <App device={device}/>
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
