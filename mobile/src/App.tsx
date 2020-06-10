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
  StatusBar,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';

import environment from './Relay/environment';
import {geolocationModule, dialogModule} from './Services';
import { Map } from './Components';

declare const global: {HermesInternal: null | {}};

const helloWorldQuery = graphql`
  query AppHelloWorldQuery {
    helloWorld 
  }
`;

const App = () => {
  const {showDialogAndroid} = dialogModule();

  const {helloWorld}: any = useLazyLoadQuery(helloWorldQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const {watchLocation, stopWatchLocation} = geolocationModule();

  useEffect(() => {
    console.log('entrou useEffect');
  }, []);



  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text>Testando testes s</Text>
            </View>
          )}
          <View style={styles.body}>
              <Text style={styles.sectionTitle}>{helloWorld}</Text>
              <Button
                title="Watch Location"
                onPress={watchLocation ? watchLocation : console.log}
              />
              <Button
                onPress={stopWatchLocation ? stopWatchLocation : console.log}
                title="Clear Watch Location"
              />
              <Button
                title="Show Dialog"
                onPress={showDialogAndroid ? showDialogAndroid : console.log}
              />
          </View>
        </ScrollView>
        <View>
          <Map/>
        </View>
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
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AppRoot;
