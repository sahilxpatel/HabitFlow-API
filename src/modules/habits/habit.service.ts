import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Habit from '../../models/Habit.model';
import TrackingLog from '../../models/TrackingLog.model';
import { calculateStreak } from '../../utils/streakCalculator';

dayjs.extend(utc);

class HabitService {
  async createHabit(userId: string, data: any) {
    if (data.tags && Array.isArray(data.tags)) {
      data.tags = data.tags.map((t: string) => t.toLowerCase().trim());
    }
    const habit = await Habit.create({
      ...data,
      userId,
    });
    return habit;
  }

  async getAllHabits(userId: string, queryParams: any) {
    const { page, limit, tag } = queryParams;
    const query: any = { userId };
    
    if (tag) {
      const tagsArray = Array.isArray(tag) ? tag : [tag];
      query.tags = { $in: tagsArray };
    }

    const skip = (page - 1) * limit;

    const [habits, total] = await Promise.all([
      Habit.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Habit.countDocuments(query)
    ]);

    return {
      habits,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getSingleHabit(userId: string, habitId: string) {
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      const error: any = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    const from = dayjs().utc().subtract(30, 'day').startOf('day').toDate();
    const to = dayjs().utc().endOf('day').toDate();

    const logs = await TrackingLog.find({
      habitId,
      completedOn: { $gte: from, $lte: to }
    }).sort({ completedOn: -1 });

    const dates = logs.map(log => log.completedOn);
    const streak = calculateStreak(dates);

    return { ...habit.toObject(), streak };
  }

  async updateHabit(userId: string, habitId: string, data: any) {
    if (data.tags && Array.isArray(data.tags)) {
      data.tags = data.tags.map((t: string) => t.toLowerCase().trim());
    }
    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, userId },
      data,
      { new: true, runValidators: true }
    );

    if (!habit) {
      const error: any = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    return habit;
  }

  async deleteHabit(userId: string, habitId: string) {
    const habit = await Habit.findOneAndDelete({ _id: habitId, userId });
    if (!habit) {
      const error: any = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    // Cascade delete TrackingLogs
    await TrackingLog.deleteMany({ habitId });

    return { message: 'Habit deleted successfully' };
  }
}

export default new HabitService();
