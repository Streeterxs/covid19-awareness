import { GraphQLObjectType } from "graphql";

import CovidPositionSubscriptions from "../modules/covidPosition/subscription/covidPositionSubscription";

const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    description: 'Subscription type',
    fields: () => ({
        CovidPositionSubscriptions
    })
});

export default SubscriptionType;
