import { Router } from 'express';
import { register, login } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';
import { authLimiter } from '../../middlewares/rateLimiter.middleware';
import { RegisterSchema, LoginSchema } from './auth.validator';

const router = Router();

router.post('/register', validate(RegisterSchema), register);
router.post('/login', authLimiter, validate(LoginSchema), login);

export default router;
