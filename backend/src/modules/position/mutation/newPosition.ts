import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLFloat } from "graphql";

import PositionType from "../PositionType";
import positionLoader from "../PositionLoader";
import Position from "../PositionModel";

type MutationInputs = {
    device: string,
    lat: number,
    lon: number
}
const NewPosition = mutationWithClientMutationId({
    name: 'NewPosition',
    description: 'New position mutation',
    inputFields: {
        device: {
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
        createdPosition: {
            type: PositionType,
            resolve: async (position) => await positionLoader(position.id)
        }
    },
    mutateAndGetPayload: async ({device, lat, lon}: MutationInputs) => {
        try {
            const findedPosition = await Position.findByDevice(device);
            if (findedPosition) {
                findedPosition.lat = lat;
                findedPosition.lon = lon;
                await findedPosition.save();
                return findedPosition;
            }
            const positionCreated = await new Position({lat, lon, device});
            await positionCreated.save();
            return positionCreated;
        } catch (err) {
            return err;
        }
    }
});

export default NewPosition