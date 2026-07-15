import mongoose, { Document } from "mongoose";
export interface IWorker extends Document {
    name: string;
    trade: string;
    bio: string;
    fullDescription: string;
    rate: number;
    rateType: string;
    location: string;
    experience: number;
    skills: string[];
    availability: string[];
    rating: number;
    totalReviews: number;
    imageUrl: string;
    verified: boolean;
    userId: string;
}
export declare const Worker: mongoose.Model<IWorker, {}, {}, {}, mongoose.Document<unknown, {}, IWorker, {}, mongoose.DefaultSchemaOptions> & IWorker & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorker>;
