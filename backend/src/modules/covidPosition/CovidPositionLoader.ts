import CovidPosition from "./CovidPositionModel";

export const covidPositionLoader = async (id: string) => {
    const covidPositionFinded = await CovidPosition.findOne({_id: id});
    return covidPositionFinded;
};

export const covidPositionDeviceLoader = async (device: string) => {
    const covidPositionFinded = await CovidPosition.findOne({device});
    return covidPositionFinded;
};