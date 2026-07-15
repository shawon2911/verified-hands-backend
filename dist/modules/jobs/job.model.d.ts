import mongoose, { Document } from "mongoose";
export interface IJob extends Document {
    title: string;
    shortDescription: string;
    fullDescription: string;
    trade: string;
    budget: number;
    preferredDate: string;
    location: string;
    address: string;
    employerId: string;
    status: "open" | "in-progress" | "completed" | "cancelled";
    workerId?: string;
    createdAt: Date;
}
export declare const Job: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, mongoose.DefaultSchemaOptions> & IJob & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJob>;
