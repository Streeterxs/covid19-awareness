import { GraphQLObjectType, GraphQLList } from "graphql";
import { connectionFromArray } from "graphql-relay";

import CovidPositionType from "../modules/covidPosition/CovidPositionType";
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
            type: GraphQLList(CovidPositionType),
            resolve: async (value, args, {me}) => {
                return connectionFromArray(await covidPositionsButMeLoader(me ? me.device : null), args)
            }
        }
    })
});

export default QueryType