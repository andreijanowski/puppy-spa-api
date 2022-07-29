import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface IWaitList extends Document {
  date: string;
}

export interface IWaitListModel extends Model<IWaitList> {
}

export const waitListSchema = new Schema({
  _id: {
    type: String,
    default: () => `w_${Random.id()}`,
    required: true
  },
  date: String,
}, { timestamps: true });

export const WaitList = mongoose.model<IWaitList, IWaitListModel>('WaitList', waitListSchema);
