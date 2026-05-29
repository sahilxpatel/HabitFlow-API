import { Router } from 'express';
import { createHabit, getHabits, getSingleHabit, updateHabit, deleteHabit } from './habit.controller';
import { validate } from '../../middlewares/validate.middleware';
import { CreateHabitSchema, UpdateHabitSchema, PaginationSchema } from './habit.validator';
import trackingRoutes from '../tracking/tracking.routes';

const router = Router();

router.post('/', validate(CreateHabitSchema, 'body'), createHabit);
router.get('/', validate(PaginationSchema, 'query'), getHabits);
router.get('/:id', getSingleHabit);
router.put('/:id', validate(UpdateHabitSchema, 'body'), updateHabit);
router.delete('/:id', deleteHabit);

// Mount tracking routes
router.use('/:id', trackingRoutes);

export default router;
