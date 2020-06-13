import CovidPosition from "../modules/covidPosition/CovidPositionModel";
import { covidPositionLoader } from "../modules/covidPosition/CovidPositionLoader";

const registeredTypes = [
    {
        name: 'CovidPosition',
        qlType: 'CovidPositionType',
        dbType: CovidPosition,
        loader: covidPositionLoader
    }
]

export default registeredTypes;