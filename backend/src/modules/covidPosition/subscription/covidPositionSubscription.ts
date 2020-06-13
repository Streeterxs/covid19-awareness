import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";

import CovidPositionType from "../CovidPositionType";
import { covidPositionLoader } from "../CovidPositionLoader";
import { ICovidPosition } from "../CovidPositionModel";
import { pubsub } from "../../../app";

const covidPositionSubscription = subscriptionWithClientId({
    name: 'CovidPositionSubscription',
    description: 'CovidPosition subscription',
    inputFields: {},
    outputFields: {
        covidPosition: {
            type: CovidPositionType,
            resolve: (covidPosition: any) => covidPositionLoader(covidPosition.id)
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('newCovidPosition');
    }, async (covidPosition: ICovidPosition, variables) => {
        console.log('variables: ', variables);
        const device = variables.me;
        const whoChanged = await covidPositionLoader(covidPosition.id);

        console.log('device: ', device);
        console.log('whoChanged: ', whoChanged);
        console.log('${device._id}` !== `${whoChanged._id}: ', `${device._id}` !== `${whoChanged._id}`)


        return `${device._id}` !== `${whoChanged._id}`;
    }),
    getPayload: async (obj: any) => ({
        id: obj.id
    })
});

export default covidPositionSubscription;
