import mongoose, { Schema } from "mongoose";

export interface ICovidPosition extends mongoose.Document {
    device: string;
    covidSituation: string;
    lat: number;
    lon: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICovidPositionModel extends mongoose.Model<ICovidPosition> {
    findByDevice: (deviceId: string) => ICovidPosition | null;
    covidPositionSchema: (covidSituation: string) => ICovidPosition[] | null
}

const covidPositionSchema = new Schema ({
    device: {
        type: String,
        required: true
    },
    covidSituation: {
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

covidPositionSchema.statics.findByDevice = async (deviceId: string) => {
    try {
        const covidPositionFinded = await CovidPosition.findOne({device: deviceId});
        return covidPositionFinded;
    } catch(err) {
        console.log(err);
        return null
    }
}

covidPositionSchema.statics.findByCovidSituation = async (covidSituation: string) => {
    try {
        const covidPositionsFinded = await CovidPosition.find({covidSituation});
        return covidPositionsFinded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const CovidPosition = mongoose.model<ICovidPosition, ICovidPositionModel>('CovidPosition', covidPositionSchema);

export default CovidPosition;