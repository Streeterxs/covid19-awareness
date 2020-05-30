import mongoose, { Schema } from "mongoose";

export interface IPositionModel extends mongoose.Document {
    lat: string;
    lon: string;
    createdAt: Date;
    updatedAt: Date;
}

const positionModel = new Schema ({
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

const Position = mongoose.model<IPositionModel>('Position', positionModel);

export default Position;