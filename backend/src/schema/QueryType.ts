import { GraphQLObjectType, GraphQLString } from "graphql";
import CovidPositionType from "../modules/covidPosition/CovidPositionType";

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
        }
    })
});

export default QueryType