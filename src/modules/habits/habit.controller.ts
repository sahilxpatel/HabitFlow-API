import { Request, Response, NextFunction } from 'express';
import habitService from './habit.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';

export const createHabit = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const habit = await habitService.createHabit(req.user.userId, req.body);
  sendSuccess(res, 201, 'Habit created successfully', habit);
});

export const getHabits = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await habitService.getAllHabits(req.user.userId, req.query);
  sendSuccess(res, 200, 'Habits fetched successfully', data);
});

export const getSingleHabit = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const habit = await habitService.getSingleHabit(req.user.userId, req.params.id as string);
  sendSuccess(res, 200, 'Habit fetched successfully', habit);
});

export const updateHabit = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const habit = await habitService.updateHabit(req.user.userId, req.params.id as string, req.body);
  sendSuccess(res, 200, 'Habit updated successfully', habit);
});

export const deleteHabit = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await habitService.deleteHabit(req.user.userId, req.params.id as string);
  sendSuccess(res, 200, result.message);
});
