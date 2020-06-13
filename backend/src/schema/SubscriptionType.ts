import { GraphQLObjectType } from "graphql";

import CovidPositionsSubscription from "../modules/covidPosition/subscription/covidPositionSubscription";

const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    description: 'Subscription type',
    fields: () => ({
        CovidPositionsSubscription
    })
});

export default SubscriptionType;
