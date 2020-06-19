import { connectDatabase } from "../database";

import CovidPosition from "../modules/covidPosition/CovidPositionModel";

(async () => {
    console.log('Connection to the database...');
    await connectDatabase();

    await CovidPosition.remove({}, () => console.log('deletados'));

    process.exit(0);
})();