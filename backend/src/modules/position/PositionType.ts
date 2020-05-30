import { GraphQLObjectType, GraphQLString } from "graphql";
import { IPositionModel } from "./PositionModel";

const PositionType = new GraphQLObjectType({
    name: 'PositionType',
    description: 'Position',
    fields: {
        lat: {
            type: GraphQLString,
            resolve: (position: IPositionModel) => position.lat
        },
        lon: {
            type: GraphQLString,
            resolve: (position: IPositionModel) => position.lon
        },
        createdAt: {
            type: GraphQLString,
            resolve: (position: IPositionModel) => position.createdAt
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (position: IPositionModel) => position.updatedAt
        }
    }
});

export default PositionType