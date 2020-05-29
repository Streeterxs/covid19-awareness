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
import Geolocation from 'react-native-geolocation-service';
// @ts-ignore
import DialogAndroid from 'react-native-dialogs';

import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';

import environment from './Relay/environment';

declare const global: {HermesInternal: null | {}};

const helloWorldQuery = graphql`
  query AppHelloWorldQuery {
    helloWorld 
  }
`;

const App = () => {
  const {helloWorld}: any = useLazyLoadQuery(helloWorldQuery, {}, {
    fetchPolicy: 'store-or-network'
  });

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const showDialogAndroid = async () => {
    const { action } = await DialogAndroid.alert('Title', 'Message');
    switch (action) {
      case DialogAndroid.actionPositive:
          console.log('positive!')
          break;
      case DialogAndroid.actionNegative:
          console.log('negative!')
          break;
      case DialogAndroid.actionNeutral:
          console.log('neutral!')
          break;
      case DialogAndroid.actionDismiss:
          console.log('dismissed!')
          break;
    }
  }

  const getLocation = async () => {
    const hasLocationPermissionConst = await hasLocationPermission();

    if (!hasLocationPermissionConst) {
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };


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
                title="Get Location"
                onPress={getLocation}
              />
              <Button
                title="Show Dialog"
                onPress={showDialogAndroid}
              />
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
