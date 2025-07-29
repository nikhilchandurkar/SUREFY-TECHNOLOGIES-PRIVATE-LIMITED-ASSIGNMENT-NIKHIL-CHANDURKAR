import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createEvent = async (req, res, next) => {
  try {
    const { title, eventDate, location, capacity } = req.body;

    if (!title || !eventDate || !location || !capacity)
      return res.status(400).json({ error: 'All fields are required.' });

    if (capacity <= 0 || capacity > 1000)
      return res.status(400).json({ error: 'Capacity must be between 1 and 1000.' });

    const event = await prisma.event.create({
      data: {
        title,
        eventDate: new Date(eventDate),
        location,
        capacity,
      },
    });

    res.status(201).json({ eventId: event.id, message: 'Event created.' });
  } catch (err) {
    next(err);
  }
};

export const getEventDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        registrations: {
          include: { user: true },
        },
      },
    });

    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const getUpcomingEvents = async (req, res, next) => {
  try {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: { eventDate: { gt: now } },
    });

    events.sort((a, b) => a.eventDate - b.eventDate || a.location.localeCompare(b.location));

    res.json(events);
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { id: eventId } = req.params;
    const { userId } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
      include: { registrations: true },
    });

    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (new Date(event.eventDate) < new Date())
      return res.status(400).json({ error: 'Cannot register for past events' });
    if (event.registrations.length >= event.capacity)
      return res.status(400).json({ error: 'Event is full' });

    const exists = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });

    if (exists) return res.status(409).json({ error: 'Already registered' });

    await prisma.eventRegistration.create({
      data: {
        userId: parseInt(userId),
        eventId: parseInt(eventId),
      },
    });

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    next(err);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
    const { id: eventId, userId } = req.params;

    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });

    if (!registration)
      return res.status(404).json({ error: 'User is not registered for this event' });

    await prisma.eventRegistration.delete({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });

    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    next(err);
  }
};

export const getEventStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });
    const registrations = await prisma.eventRegistration.count({ where: { eventId: parseInt(id) } });

    if (!event) return res.status(404).json({ error: 'Event not found' });

    const remaining = event.capacity - registrations;
    const percent = ((registrations / event.capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations: registrations,
      remainingCapacity: remaining,
      percentageUsed: `${percent}%`,
    });
  } catch (err) {
    next(err);
  }
};


