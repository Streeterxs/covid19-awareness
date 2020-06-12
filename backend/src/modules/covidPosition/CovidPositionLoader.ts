import CovidPosition from "./CovidPositionModel";

const covidPositionLoader = async (id: string) => {
    const covidPositionFinded = await CovidPosition.findOne({_id: id});
    return covidPositionFinded;
};

export default covidPositionLoader