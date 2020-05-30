import PositionMutations from '../modules/position/mutation';
import { GraphQLObjectType } from 'graphql';

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation types',
    fields: {
        ...PositionMutations
    }
})