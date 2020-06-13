import { CovidPosition } from "../../App";
import { geolocationModule } from "..";
import { dialogModule } from "..";
import { Device } from '../Device';

const covidPositionModule = () => {
    const {watchLocation, stopWatchLocation, isWatching} = geolocationModule();
    const {showDialogAndroid} = dialogModule();

    const initialHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {
        deviceHandler(
            (covidObj_1) => covidSituationHandler(
                (covidObj_2) => covidPositionHandler(
                    (covidObj_3) => callback(covidObj_3),
                    covidObj_2),
                covidObj_1),
            covidPositionObj
        );
    }

    const deviceHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {
        (async () => {
            const covidPositionCopy: CovidPosition = {
                ...covidPositionObj,
                device: await Device.getDevice()
            };
            callback(covidPositionCopy);
        })()
    };

    const covidSituationHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {
  
        showDialogAndroid((covidSituationReturned) => {

            let covidPositionCopy = {
                ...covidPositionObj,
                covidSituation: covidSituationReturned
            };

            callback(covidPositionCopy);
            return;

        });
  
    };
  
    const covidPositionHandler = (callback: (covidPositionObj: CovidPosition) => void, covidPositionObj: CovidPosition) => {
  
        watchLocation((watchPosition) => {

            let covidPositionCopy = {
                ...covidPositionObj,
                lat: watchPosition.coords.latitude,
                lon: watchPosition.coords.longitude
            };

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