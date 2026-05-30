import { Request, Response, NextFunction } from 'express';
import trackingService from './tracking.service';

export const markAsDone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const log = await trackingService.markAsDone(req.user.userId, req.params.id as string);
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await trackingService.getHistory(req.user.userId, req.params.id as string);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
