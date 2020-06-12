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
  Button
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

const helloWorldQuery = graphql`
  query AppHelloWorldQuery {
    helloWorld 
  }
`;

const newCovidPositionMutation = graphql`
  mutation AppNewCovidPositionMutation($device: String!, $covidSituation: String!, $lat: Float!, $lon: Float!) {
    NewCovidPosition(input: {device: $device, covidSituation: $covidSituation, lat: $lat, lon: $lon, clientMutationId: "1"}) {
      createdCovidPosition {
        lat
        lon
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
  const [covidPosition, setCovidPosition] = useState<CovidPosition>({
    device: getUniqueId(),
    covidSituation: 'diseased',
    lat: -14.2350044,
    lon: -51.9252815
  });
  const {showDialogAndroid} = dialogModule();

  const {helloWorld}: any = useLazyLoadQuery(helloWorldQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {watchLocation, stopWatchLocation, isWatching} = geolocationModule();

  const covidSituationHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj?: CovidPosition) => {

    showDialogAndroid((covidSituationReturned) => {

      let covidPositionCopy = {
        ...covidPosition,
        covidSituation: covidSituationReturned
      };

      if (covidPositionObj) {

        covidPositionCopy = {
          ...covidPositionObj,
          covidSituation: covidSituationReturned
        };

        setCovidPosition({
          ...covidPositionCopy
        });

        callback(covidPositionCopy);
        return;
  
      }

      setCovidPosition({
        ...covidPositionCopy
      });

      callback(covidPositionCopy);
      return;
  
    });

  };

  const covidPositionHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj?: CovidPosition) => {

    watchLocation((watchPosition) => {

      let covidPositionCopy = {
        ...covidPosition,
        lat: watchPosition.coords.latitude,
        lon: watchPosition.coords.longitude
      };

      if (covidPositionObj) {

        covidPositionCopy = {
          ...covidPositionObj,
          lat: watchPosition.coords.latitude,
          lon: watchPosition.coords.longitude
        };
        
        setCovidPosition({
          ...covidPositionCopy
        });

        callback(covidPositionCopy);
        return;
      }
        
      setCovidPosition({
        ...covidPositionCopy
      });

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

    let covidPositionObj = {
      ...covidPosition
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
            <Map position={covidPosition} situationUpdate={() => {

                if(!isWatching) {

                  let covidPositionObj = {
                    ...covidPosition
                  };
                  covidSituationHandler((covidObj) => covidPositionHandler(commitNewPosition, covidObj), covidPositionObj);

                  return;
                }

                covidSituationHandler(commitNewPosition);

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
