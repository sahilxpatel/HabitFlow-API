import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Habit from '../../models/Habit.model';
import TrackingLog from '../../models/TrackingLog.model';

dayjs.extend(utc);

class TrackingService {
  async markAsDone(userId: string, habitId: string) {
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      const error: any = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    const today = dayjs().utc().startOf('day').toDate();

    try {
      const log = await TrackingLog.create({
        habitId,
        userId,
        completedOn: today,
      });
      return log;
    } catch (error: any) {
      if (error.code === 11000) {
        const conflictError: any = new Error('Already tracked today');
        conflictError.status = 409;
        throw conflictError;
      }
      throw error;
    }
  }

  async getHistory(userId: string, habitId: string) {
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      const error: any = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    const from = dayjs().utc().subtract(7, 'day').startOf('day').toDate();
    const to = dayjs().utc().endOf('day').toDate();

    const logs = await TrackingLog.find({
      habitId,
      completedOn: { $gte: from, $lte: to }
    }).sort({ completedOn: 1 });

    return logs;
  }
}

export default new TrackingService();
