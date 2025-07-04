const Event = require('../models/eventModel');
const Registration = require('../models/registrationModel');

exports.showRegisterEvent = async (req, res) => {
  const events = await Event.find();
  const registrations = await Registration.find();

  const data = events.map(event => {
    const registeredCount = registrations.filter(r => r.eventId === event.id).length;
    return { ...event.toObject(), registeredCount };
  });
  res.render('registerEvent', { events: data });
};

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.session.user._id; 
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    const count = await Registration.countDocuments({ eventId: event._id });
    if (count >= event.capacity) {
      return res.send('Event is full');
    }

    const existing = await Registration.findOne({ studentId: userId, eventId: event._id });
    if (existing) {
      return res.send('You already registered for this event');
    }

    await Registration.create({
      studentId: userId,
      eventId: event._id
    });

    res.redirect('/events/register');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};