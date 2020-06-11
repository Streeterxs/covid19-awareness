import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";
import { IPosition } from "./PositionModel";

const PositionType = new GraphQLObjectType({
    name: 'PositionType',
    description: 'Position',
    fields: {
        lat: {
            type: GraphQLFloat,
            resolve: (position: IPosition) => position.lat
        },
        lon: {
            type: GraphQLFloat,
            resolve: (position: IPosition) => position.lon
        },
        createdAt: {
            type: GraphQLString,
            resolve: (position: IPosition) => position.createdAt
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (position: IPosition) => position.updatedAt
        }
    }
});

export default PositionType