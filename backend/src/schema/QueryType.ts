import { GraphQLObjectType } from "graphql";
import { connectionFromArray } from "graphql-relay";

import CovidPositionType, { CovidPositionsConnection } from "../modules/covidPosition/CovidPositionType";
import { covidPositionsButMeLoader } from "../modules/covidPosition/CovidPositionLoader";
import { nodeField } from "../graphql/NodeDefinitions";
import { nodesField } from "../graphql/NodeDefinitions";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        myCovidPosition: {
            type: CovidPositionType,
            resolve: (value, args, {me}) => {
                console.log('me: ', me);
                return me ? me : null;
            }
        },
        allCovidPositionsButMe: {
            type: CovidPositionsConnection,
            resolve: async (value, args, {me}) => {
                console.log('me: ', me);
                return connectionFromArray(await covidPositionsButMeLoader(me ? me.device : null), args)
            }
        }
    })
});

export default QueryType