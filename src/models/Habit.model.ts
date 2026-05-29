import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IHabit extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  tags?: string[];
  reminderTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HabitSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
    frequency: {
      type: String,
      required: true,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    tags: {
      type: [String],
      default: [],
    },
    reminderTime: {
      type: String,
      required: false,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use a valid time format HH:MM'],
    },
  },
  {
    timestamps: true,
  }
);

HabitSchema.index({ userId: 1 });

export default mongoose.model<IHabit>('Habit', HabitSchema);
