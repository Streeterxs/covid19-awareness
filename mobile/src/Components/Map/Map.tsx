import React, { useState, useEffect } from 'react';
import {
    View, Dimensions, StyleSheet, Button
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import { covidPositionsSubscriptionModule } from '../../Services/subscriptions';
import { CovidPosition } from '../../Services/covidPosition/covidPosition';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -14.2350044;
const LONGITUDE = -51.9252815;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type MapProps = {
  myPosition: CovidPosition,
  otherCovidPositions?: CovidPosition[],
  situationUpdate: () => void
};

type RegionType = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}


const Map = ({myPosition, otherCovidPositions, situationUpdate}: MapProps) => {
  const [regionObj, setRegionObj] = useState<RegionType>(
    {
      latitude: myPosition && myPosition.lat ? myPosition.lat : LATITUDE,
      longitude: myPosition && myPosition.lon ? myPosition.lon : LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  );
  const [map, setMap] = useState<MapView>();

  useEffect(() => {
    console.log('use effect do mapa: ', myPosition);
    setRegionObj(
      {
        latitude: myPosition && myPosition.lat ? myPosition.lat : LATITUDE,
        longitude: myPosition && myPosition.lon ? myPosition.lon : LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
    map?.animateCamera({
      center: {
        latitude: myPosition && myPosition.lat ? myPosition.lat : LATITUDE,
        longitude: myPosition && myPosition.lon ? myPosition.lon : LONGITUDE,
      }
    });
  }, [myPosition]);

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
        <Marker
          coordinate={regionObj}
          title="Your position"
          description={`Situation: ${myPosition ? myPosition.covidSituation : 'Not Choosed'}`}
          pinColor="indigo"
        />
        {
          otherCovidPositions?.map(covidPosition => {
            return <Marker
              coordinate={{
                latitude: covidPosition?.lat ? covidPosition.lat : 0,
                longitude: covidPosition?.lon ? covidPosition?.lon : 0
              }}
              title={`Situation: ${covidPosition?.covidSituation}`}
              pinColor={pinColorSituationHandler(covidPosition?.covidSituation ? covidPosition.covidSituation : 'negative')}
            />
          })
        }
      </MapView>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="my position" onPress={() => {
              map?.animateCamera({
                center: {
                  latitude: myPosition && myPosition.lat ? myPosition.lat : LATITUDE,
                  longitude: myPosition && myPosition.lon ? myPosition.lon : LONGITUDE,
                }
              }, {duration: 300})
            }
          }/>
        </View>
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
