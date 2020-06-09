import { GraphQLSchema } from "graphql";
import QueryType from "./QueryType";
import MutationType from "./MutationType";

const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema