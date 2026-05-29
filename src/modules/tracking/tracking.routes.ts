import { Router } from 'express';
import { markAsDone, getHistory } from './tracking.controller';

const router = Router({ mergeParams: true });

router.post('/track', markAsDone);
router.get('/history', getHistory);

export default router;
