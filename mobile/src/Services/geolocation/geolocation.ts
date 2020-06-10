import Geolocation from 'react-native-geolocation-service';
import { locationPermissionModule } from '../permissions';

type WatchObject = {
    isWatching: boolean,
    value: number | null
};

const geolocationModule = () => {
    let watchObject: WatchObject = {
        isWatching: false,
        value: null
    };

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
        if (!(await locatPermissionChecker())) {
            return;
        }

        if (!watchObject.isWatching) {
            watchObject.isWatching = true;

            watchObject.value = Geolocation.watchPosition((position) => {
                console.log(position);
            }, 
            err => console.log);
        }

    };

    const stopWatchLocation = async () => {
        if (!(await locatPermissionChecker())) {
            return;
        }

        if (watchObject.isWatching && typeof watchObject.value === 'number') {
            Geolocation.clearWatch(watchObject.value);
            watchObject.value = null;
            watchObject.isWatching = false;
        }
    }

    return {
        watchLocation,
        stopWatchLocation
    }
}

export default geolocationModule;