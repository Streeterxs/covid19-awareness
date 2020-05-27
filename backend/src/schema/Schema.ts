import { GraphQLSchema } from "graphql";
import QueryType from "./QueryType";

const Schema = new GraphQLSchema({
    query: QueryType
});

export default Schema