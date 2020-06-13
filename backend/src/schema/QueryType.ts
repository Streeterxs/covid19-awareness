import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import CovidPositionType from "../modules/covidPosition/CovidPositionType";
import { covidPositionsButMeLoader } from "../modules/covidPosition/CovidPositionLoader";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    fields: () => ({
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
                return await covidPositionsButMeLoader(me ? me.device : null)
            }
        }
    })
});

export default QueryType