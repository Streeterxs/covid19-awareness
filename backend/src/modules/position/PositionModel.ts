import mongoose, { Schema } from "mongoose";

export interface IPosition extends mongoose.Document {
    device: string;
    lat: number;
    lon: number;
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
        type: Number,
        required: true
    },
    lon: {
        type: Number,
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
        return null
    }
}

const Position = mongoose.model<IPosition, IPositionModel>('Position', positionSchema);

export default Position;