import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLFloat } from "graphql";

import CovidPositionType from "../CovidPositionType";
import {covidPositionLoader} from "../CovidPositionLoader";
import CovidPosition from "../CovidPositionModel";
import { pubsub } from "../../../app";

type MutationInputs = {
    device: string,
    covidSituation: string,
    lat: number,
    lon: number
}
const NewCovidPosition = mutationWithClientMutationId({
    name: 'NewCovidPosition',
    description: 'New CovidPosition mutation',
    inputFields: {
        device: {
            type: GraphQLString
        },
        covidSituation: {
            type: GraphQLString
        },
        lat: {
            type: GraphQLFloat
        },
        lon: {
            type: GraphQLFloat
        }
    },
    outputFields: {
        createdCovidPosition: {
            type: CovidPositionType,
            resolve: async (Covidposition) => await covidPositionLoader(Covidposition.id)
        }
    },
    mutateAndGetPayload: async ({device, covidSituation, lat, lon}: MutationInputs) => {
        try {

            const findedCovidPosition = await CovidPosition.findByDevice(device);

            if (findedCovidPosition) {

                findedCovidPosition.covidSituation = covidSituation;
                findedCovidPosition.lat = lat;
                findedCovidPosition.lon = lon;

                console.log(findedCovidPosition);
                await findedCovidPosition.save();
                pubsub.publish('newCovidPosition', findedCovidPosition);
                return findedCovidPosition;

            }

            const covidPositionCreated = await new CovidPosition({lat, lon, device, covidSituation});

            console.log(covidPositionCreated);
            await covidPositionCreated.save();
            pubsub.publish('newCovidPosition', findedCovidPosition);
            return covidPositionCreated;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
});

export default NewCovidPosition