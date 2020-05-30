import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql";

import PositionType from "../PositionType";
import positionLoader from "../PositionLoader";
import Position from "../PositionModel";

const NewPosition = mutationWithClientMutationId({
    name: 'NewPosition',
    description: 'New position mutation',
    inputFields: {
        lat: {
            type: GraphQLString
        },
        lon: {
            type: GraphQLString
        }
    },
    outputFields: {
        createdPosition: {
            type: PositionType,
            resolve: async (position) => await positionLoader(position.id)
        }
    },
    mutateAndGetPayload: async ({lat, lon}) => {
        try {
            const positionCreated = await new Position({lat, lon});
            console.log(positionCreated);
            await positionCreated.save();
            return positionCreated;
        } catch (err) {
            return err;
        }
    }
});

export default NewPosition