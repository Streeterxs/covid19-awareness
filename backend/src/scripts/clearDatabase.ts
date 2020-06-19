import { connectDatabase } from "../database";

import CovidPosition from "../modules/covidPosition/CovidPositionModel";

(async () => {
    console.log('Connection to the database...');
    await connectDatabase();

    CovidPosition.remove({}, () => console.log('deletados'));

    process.exit(0);
})();