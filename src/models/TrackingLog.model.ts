import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITrackingLog extends Document {
  habitId: Types.ObjectId;
  userId: Types.ObjectId;
  completedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TrackingLogSchema: Schema = new Schema(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    completedOn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TrackingLogSchema.index({ habitId: 1, completedOn: 1 }, { unique: true });
TrackingLogSchema.index({ habitId: 1 });
TrackingLogSchema.index({ userId: 1 });

export default mongoose.model<ITrackingLog>('TrackingLog', TrackingLogSchema);
