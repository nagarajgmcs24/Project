import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  userId: string;
  wardId: string;
  title: string;
  category: string;
  description: string;
  photoUrl: string;
  userName: string;
  userPhone: string;
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  isVerified: boolean;
  isReal: boolean;
  verificationNotes: string;
  councillorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    userId: {
      type: String,
      required: true,
    },
    wardId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'road-damage',
        'water-problem',
        'footpath',
        'drainage',
        'street-light',
        'garbage',
        'other',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'resolved', 'rejected'],
      default: 'pending',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isReal: {
      type: Boolean,
      default: null,
    },
    verificationNotes: {
      type: String,
      default: '',
    },
    councillorId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
reportSchema.index({ wardId: 1, status: 1 });
reportSchema.index({ userId: 1 });
reportSchema.index({ createdAt: -1 });

export const Report = mongoose.model<IReport>('Report', reportSchema);
