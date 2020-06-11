import mongoose, { Schema } from "mongoose";

export interface IPosition extends mongoose.Document {
    device: string;
    lat: string;
    lon: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPositionModel extends mongoose.Model<IPosition> {
    findByDevice: (deviceId: string) => IPosition | void
}

const positionSchema = new Schema ({
    device: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

positionSchema.statics.findByDevice = async (deviceId: string) => {
    try {
        const positionFinded = await Position.findOne({device: deviceId});
        return positionFinded;
    } catch(err) {
        console.log(err);
    }
}

const Position = mongoose.model<IPosition, IPositionModel>('Position', positionSchema);

export default Position;