import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";
import { ICovidPosition } from "./CovidPositionModel";
import { globalIdField, connectionDefinitions } from "graphql-relay";

const CovidPositionType = new GraphQLObjectType({
    name: 'CovidPositionType',
    description: 'Covid Position',
    fields: {
        id: globalIdField('CovidPosition'),
        covidSituation: {
            type: GraphQLString,
            resolve: (covidPosition: ICovidPosition) => covidPosition.covidSituation
        },
        lat: {
            type: GraphQLFloat,
            resolve: (covidPosition: ICovidPosition) => covidPosition.lat
        },
        lon: {
            type: GraphQLFloat,
            resolve: (covidPosition: ICovidPosition) => covidPosition.lon
        },
        createdAt: {
            type: GraphQLString,
            resolve: (covidPosition: ICovidPosition) => covidPosition.createdAt
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (covidPosition: ICovidPosition) => covidPosition.updatedAt
        }
    }
});

export const {connectionType: CovidPositionsConnection} =
        connectionDefinitions({nodeType: CovidPositionType});

export default CovidPositionType