import CovidPositionMutations from '../modules/covidPosition/mutation';
import { GraphQLObjectType } from 'graphql';

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation types',
    fields: {
        ...CovidPositionMutations
    }
});

export default MutationType;