import { geolocationModule } from "../geolocation";
import { dialogModule } from "../dialog";
import { Device } from '../Device';
import { ToastAndroid } from "react-native";

const LATITUDE = -14.2350044;
const LONGITUDE = -51.9252815;

export type CovidPosition = {
    readonly lat: number | null;
    readonly lon: number | null;
    readonly device: string | null;
    readonly covidSituation: string | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
} | null;

export type CovidPositionCertain = {
    readonly lat: number;
    readonly lon: number;
    readonly device: string;
    readonly covidSituation: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}

const covidPositionModule = () => {
    const {watchLocation, stopWatchLocation, isWatching} = geolocationModule();
    const {showDialogAndroid} = dialogModule();

    const initialHandler = (callback: (covidPositionObj: CovidPositionCertain) => void, covidPositionObj: CovidPosition | null) => {

        deviceHandler(
            (covidObj_1) => covidSituationHandler(
                (covidObj_2) => covidPositionHandler(
                    (covidObj_3) => callback(covidObj_3),
                    covidObj_2),
                covidObj_1),
                covidPositionObj
        );
    }

    const deviceHandler = (callback: (covidPositionObj: CovidPositionCertain) => void, covidPositionObj: CovidPosition) => {
        (async () => {
            const {lat = LATITUDE, lon = LONGITUDE, covidSituation = 'negative', createdAt=null, updatedAt=null}: any = covidPositionObj || {}
            
            const covidPositionCopy: CovidPositionCertain = {
                lat,
                lon,
                covidSituation,
                createdAt,
                updatedAt,
                device: await Device.getDevice()
            };
            
            console.log('device handler covid copy: ', covidPositionCopy);
            callback(covidPositionCopy);
        })()
    };

    const covidSituationHandler = (callback: (covidPositionObj: CovidPositionCertain) => void, covidPositionObj: CovidPosition) => {
  
        showDialogAndroid((covidSituationReturned) => {

            const {lat=LATITUDE, lon=LONGITUDE, device="0", createdAt=null, updatedAt=null}: any = covidPositionObj || {}
            let covidPositionCopy: CovidPositionCertain = {
                lat,
                lon,
                device,
                createdAt,
                updatedAt,
                covidSituation: covidSituationReturned
            };
            
            console.log('covid situation handler covid copy: ', covidPositionCopy);
            callback(covidPositionCopy);
            return;

        }, () => {
            if (!isWatching()) {
                ToastAndroid.show(
                    'Report your situation to track your position.',
                    ToastAndroid.LONG,
                );
            }
        });
  
    };
  
    const covidPositionHandler = (callback: (covidPositionObj: CovidPositionCertain) => void, covidPositionObj: CovidPosition) => {
  
        watchLocation((watchPosition) => {
            const {covidSituation="negative", device="0", createdAt=null, updatedAt=null}: any = covidPositionObj || {};

            let covidPositionCopy: CovidPositionCertain = {
                covidSituation,
                device,
                createdAt,
                updatedAt,
                lat: watchPosition.coords.latitude,
                lon: watchPosition.coords.longitude
            };
            
            console.log('covid position handler covid copy: ', covidPositionCopy);

            callback(covidPositionCopy);
            return;
        });
    };

    return {
        deviceHandler,
        covidSituationHandler,
        covidPositionHandler,
        isWatching,
        stopWatchLocation,
        initialHandler
    }
};

export default covidPositionModule;