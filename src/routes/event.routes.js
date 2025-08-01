import { Router } from 'express';
import {
  createEvent,
  getEventDetails,
  getUpcomingEvents,
  registerUser,
  cancelRegistration,
  getEventStats,
  listAllEventsWithUsers,
  listEventsSorted,
  getUserEventsLast30Days,

} from '../controllers/event.controller.js';

const router = Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.get('/upcoming/list', getUpcomingEvents);
router.post('/:id/register', registerUser);
router.delete('/:id/register/:userId', cancelRegistration);
router.get('/:id/stats', getEventStats);
router.get('/all/list', listAllEventsWithUsers);
router.get('/all/sorted', listEventsSorted)

router.get("/30-days/:userId", getUserEventsLast30Days)

export default router;