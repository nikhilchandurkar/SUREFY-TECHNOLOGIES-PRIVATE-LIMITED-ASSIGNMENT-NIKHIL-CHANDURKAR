import { Router } from 'express';
import {
  createEvent,
  getEventDetails,
  getUpcomingEvents,
  registerUser,
  cancelRegistration,
  getEventStats,
} from '../controllers/event.controller.js';

const router = Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.get('/upcoming/list', getUpcomingEvents);
router.post('/:id/register', registerUser);
router.delete('/:id/register/:userId', cancelRegistration);
router.get('/:id/stats', getEventStats);

export default router;