import React from 'react';
import {
    View, Dimensions, StyleSheet
} from 'react-native';

import MapView, {Marker} from 'react-native-maps-osmdroid';
import { Position } from '../../App';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type MapProps = {
  position: Position
};

const Map = ({position}: MapProps) => {
  console.log(position);

    return (
      <View style={styles.container}>
        <MapView
          provider={"osmdroid"}
          region={{
            latitude: position.lat,
            longitude: position.lon,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            
          }}
          showsUserLocation={true}
          showsScale={true}
          showsMyLocationButton={true}
          style={styles.map}
          showsPointsOfInterest={true}
          showsCompass={true}
        >
          <Marker
            coordinate={{latitude: position.lat, longitude: position.lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
            title={'TESTE'}
            description={'TESTE'}
            pinColor="#ffffff"
          />
        </MapView>
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
    height
  },
});

export default Map;
