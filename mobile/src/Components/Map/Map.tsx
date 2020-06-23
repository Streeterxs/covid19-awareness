import React, { useState, useEffect, Suspense } from 'react';
import {
    View, Dimensions, StyleSheet, Button
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import { covidPositionsSubscriptionModule } from '../../Services/subscriptions';
import { CovidPosition } from '../../Services/covidPosition/covidPosition';
import { AppAllCovidPositionsButMeQueryResponse } from '../../__generated__/AppAllCovidPositionsButMeQuery.graphql';
import { AppMyCovidPositionQueryResponse } from '../../__generated__/AppMyCovidPositionQuery.graphql';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -14.2350044;
const LONGITUDE = -51.9252815;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type MapProps = {
  myPosition: AppMyCovidPositionQueryResponse,
  otherCovidPositions?: AppAllCovidPositionsButMeQueryResponse,
  situationUpdate: () => void
};

type RegionType = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

const placeholderRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

const PlaceholderMark = (): JSX.Element => {
  return (
    <Marker
    coordinate={placeholderRegion}
    title="Your position"
    description={`Situation: Not Choosed`}
    pinColor="indigo"/>
  );
};

const Map = ({myPosition, otherCovidPositions, situationUpdate}: MapProps) => {
  const [regionObj, setRegionObj] = useState<RegionType>(
    {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  );
  const [map, setMap] = useState<MapView>();

  useEffect(() => {

    console.log('use effect do mapa: ', myPosition);
    if (myPosition.myCovidPosition) {

      setRegionObj(
        {
          latitude: myPosition.myCovidPosition.lat ? myPosition.myCovidPosition.lat : LATITUDE,
          longitude: myPosition.myCovidPosition.lon ? myPosition.myCovidPosition.lon : LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
      });
  
      map?.animateCamera({
        center: {
          latitude: myPosition.myCovidPosition.lat ? myPosition.myCovidPosition.lat : LATITUDE,
          longitude: myPosition.myCovidPosition.lon ? myPosition.myCovidPosition.lon : LONGITUDE,
        }
      });
    }
  }, [myPosition, otherCovidPositions]);

  const pinColorSituationHandler = (covidSituation: string) => {

    switch (covidSituation) {
      case 'diseased':
        return 'tomato';
      case 'suspect':
        return 'yellow';
      case 'negative':
        return 'teal';
      default:
        return 'tomato';
    }
  }

  return (

    <View style={styles.container}>
      <MapView
        initialRegion={regionObj}
        ref={ref => {if(ref){setMap(ref)}}}
        showsScale={false}
        showsMyLocationButton={true}
        maxZoomLevel={20}
        minZoomLevel={7}
        style={styles.map}
      >
        <Suspense fallback={<PlaceholderMark/>}>
          <Marker
            coordinate={regionObj}
            title="Your position"
            description={`Situation: ${myPosition.myCovidPosition}`}
            pinColor="indigo"
          />
        </Suspense>
        <Suspense fallback={null}>
          {
            otherCovidPositions?.allCovidPositionsButMe?.edges?.map((edge) => edge?.node as CovidPosition).map((covidPosition, index) => {
              return <Marker
                key={index}
                coordinate={{
                  latitude: covidPosition?.lat ? covidPosition?.lat : 0,
                  longitude: covidPosition?.lon ? covidPosition?.lon : 0
                }}
                title={`Situation: ${covidPosition?.covidSituation}`}
                pinColor={pinColorSituationHandler(covidPosition?.covidSituation ? covidPosition.covidSituation : 'negative')}
              />
            })
          }
        </Suspense>
      </MapView>
      <View style={styles.buttons}>
        <Suspense fallback={null}>
          <View style={styles.button}>
            <Button title="my position" onPress={() => {
                map?.animateCamera({
                  center: {
                    latitude: myPosition.myCovidPosition?.lat ? myPosition.myCovidPosition?.lat : LATITUDE,
                    longitude: myPosition.myCovidPosition?.lon ? myPosition.myCovidPosition?.lon : LONGITUDE,
                  }
                }, {duration: 300})
              }
            }/>
          </View>
        </Suspense>
        <View style={styles.button}>
          <Button title="my situation" onPress={situationUpdate}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width,
    height,
    maxHeight: height
  },
  buttons: {
    position: 'absolute',
    left: 0,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  button: {
    margin: '10%'
  }
});

export default Map;
