import { covidPositionDeviceLoader } from './modules/covidPosition/CovidPositionLoader';
import { ICovidPosition } from './modules/covidPosition/CovidPositionModel';

type getCurrentUserType = {
    (identifier: string): Promise<ICovidPosition | {me: null}>
};

const getCurrentUser: getCurrentUserType = async (identifier: string) => {
    try {
        const covidPositionFinded = await covidPositionDeviceLoader(identifier);
        return covidPositionFinded
    } catch(err) {
        console.log('error: ', err);
        return {me: null}
    }
};

export default getCurrentUser;