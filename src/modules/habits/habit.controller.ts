import { Request, Response, NextFunction } from 'express';
import habitService from './habit.service';

export const createHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const habit = await habitService.createHabit(req.user.userId, req.body);
    res.status(201).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

export const getHabits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await habitService.getAllHabits(req.user.userId, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getSingleHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const habit = await habitService.getSingleHabit(req.user.userId, req.params.id);
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

export const updateHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const habit = await habitService.updateHabit(req.user.userId, req.params.id, req.body);
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await habitService.deleteHabit(req.user.userId, req.params.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};
