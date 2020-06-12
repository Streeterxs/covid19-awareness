import React, { useState, useEffect } from 'react';
import {
    View, Dimensions, StyleSheet, Button
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import { CovidPosition } from '../../App';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type MapProps = {
  position: CovidPosition,
  situationUpdate: () => void
};

type RegionType = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

const Map = ({position, situationUpdate}: MapProps) => {
  console.log('carregou mapa!');
  const [regionObj, setRegionObj] = useState<RegionType>(
    {
      latitude: position.lat,
      longitude: position.lon,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  );
  const [map, setMap] = useState<MapView>();

  useEffect(() => {
    console.log('use effect do mapa: ', position);
    setRegionObj(
      {
        latitude: position.lat,
        longitude: position.lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
    map?.animateCamera({
      center: {
        latitude: position.lat,
        longitude: position.lon,
      }
    })
  }, [position])

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
          title="Me"
          pinColor="teal"
        />
      </MapView>
      <View style={styles.button}>
        <Button title="my position" onPress={() => {
            map?.animateCamera({
              center: {
                  latitude: position.lat,
                  longitude: position.lon,
              }
            }, {duration: 300})
          }
        }/>
        <Button title="my situation" onPress={situationUpdate}/>
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
  button: {
    position: 'absolute',
    left: 0,
    bottom: '10%',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default Map;
