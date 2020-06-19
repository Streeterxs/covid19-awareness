import { connectDatabase } from "../database";

import CovidPosition from "../modules/covidPosition/CovidPositionModel";

(async () => {
    console.log('Connection to the database...');
    await connectDatabase();

    console.log('Saving new positions: ');
    await new CovidPosition(
        {lat: 37.8220081, lon: -121.0839830, device: 1, covidSituation: 'diseased'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 37.8220081, lon: -124.0839830, device: 2, covidSituation: 'diseased'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 34.8220081, lon: -124.0839830, device: 3, covidSituation: 'suspect'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 36.8220081, lon: -124.0839830, device: 4, covidSituation: 'negative'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 37.8220081, lon: -122.0839830, device: 5, covidSituation: 'diseased'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 37.8220081, lon: -122.4839830, device: 6, covidSituation: 'diseased'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 34.5220081, lon: -124.4539830, device: 7, covidSituation: 'suspect'}
    ).save();
    console.log('Position saved!');

    await new CovidPosition(
        {lat: 36.6220081, lon: -124.2839830, device: 8, covidSituation: 'negative'}
    ).save();
    console.log('Position saved!');

    process.exit(0);
})();