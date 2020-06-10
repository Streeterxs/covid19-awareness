import Geolocation from 'react-native-geolocation-service';
import { locationPermissionModule } from '../permissions';

const geolocationModule = () => {
    let watchId: number | null;
    let locatPermissionModule = locationPermissionModule();

    const hasGeolocationPermition = () => {
        let hasCheckedPermission = false;
        let boolPermission = false;

        const checkPermission = async () => {
            if (!hasCheckedPermission) {
                boolPermission = await locatPermissionModule.hasLocationPermission();
                hasCheckedPermission = true
            }
            return boolPermission
        };

        return checkPermission
    }


    const locatPermissionChecker = hasGeolocationPermition();



    const watchLocation = async () => {
        const hasGeolocationPermition = await locatPermissionModule.hasLocationPermission();

        console.log('entrou watchLocation');

        if (await locatPermissionChecker()) {
            return;
        }
        watchId = Geolocation.watchPosition((position) => {
            console.log(position);
        }, 
        err => console.log);
        console.log(watchId);
    };

    const stopWatchLocation = async () => {

        console.log('entrou stopWatchLocation');
        if (await locatPermissionChecker()) {
            return;
        }
        
        console.log('typeof watchId: ', typeof watchId);
        if (typeof watchId === 'number') Geolocation.clearWatch(watchId);
        
        watchId = null;
    }

    return {
        watchLocation,
        stopWatchLocation
    }
}

export default geolocationModule;