import mongoose, { Schema, Document } from 'mongoose';

export interface IWard extends Document {
  name: string;
  councillor: string;
  party: string;
  phone: string;
  email: string;
  location: string;
  area: string;
  createdAt: Date;
  updatedAt: Date;
}

const wardSchema = new Schema<IWard>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    councillor: {
      type: String,
      required: true,
    },
    party: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Ward = mongoose.model<IWard>('Ward', wardSchema);
