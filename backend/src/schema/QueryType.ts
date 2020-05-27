import { GraphQLObjectType, GraphQLString } from "graphql";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    fields: () => ({
        helloWorld: {
            type: GraphQLString,
            resolve: () => {
                console.log('entrou hello world query type');
                return 'hello world';
            }
        }
    })
});

export default QueryType