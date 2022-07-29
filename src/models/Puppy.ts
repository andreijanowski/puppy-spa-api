import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface IPuppy extends Document {
  owner: string;
  name: string;
  service: string;
  arriveAt: Date;
  order: number;
  isEnded: boolean;
  waitList: string;
}

export interface IPuppyModel extends Model<IPuppy> {
}

export const puppySchema = new Schema({
  _id: {
    type: String,
    default: () => `p_${Random.id()}`,
    required: true
  },
  owner: String,
  name: String,
  service: String,
  arriveAt: Date,
  order: Number,
  isEnded: Boolean,
  waitList: {
    type: String,
    ref: 'WaitList'
  }
}, { timestamps: true });

export const Puppy = mongoose.model<IPuppy, IPuppyModel>('Puppy', puppySchema);
