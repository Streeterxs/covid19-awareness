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

import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks';
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

export type Position = {
  device: string,
  lat: number,
  lon: number;
};
const App = () => {
  const [position, setPosition] = useState<Position>({
    device: getUniqueId(),
    lat: -14.2350044,
    lon: -51.9252815
  });
  const {showDialogAndroid} = dialogModule();

  const {helloWorld}: any = useLazyLoadQuery(helloWorldQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {watchLocation, stopWatchLocation} = geolocationModule();

  useEffect(() => {
    showDialogAndroid(() => {

      watchLocation((watchPosition) => {

        setPosition({
          ...position,
          lat: watchPosition.coords.latitude,
          lon: watchPosition.coords.longitude
        });

      });
  
      setTimeout(() => {
        setPosition({...position, lat: -14.2350044, lon: -51.9252815});
      }, 10000);
  
    });


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
            <Text>Testando testando</Text>
            <Map position={position}/>
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
