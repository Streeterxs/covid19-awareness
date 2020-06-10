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

        if (await locatPermissionChecker()) {
            return;
        }

        watchId = Geolocation.watchPosition((position) => {
            console.log(position);
        }, 
        err => console.log);

    };

    const stopWatchLocation = async () => {

        if (await locatPermissionChecker()) {
            return;
        }

        if (typeof watchId === 'number') Geolocation.clearWatch(watchId);
        
        watchId = null;
    }

    return {
        watchLocation,
        stopWatchLocation
    }
}

export default geolocationModule;