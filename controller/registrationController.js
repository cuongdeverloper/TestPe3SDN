const Registration = require('../models/registrationModel');

exports.cancelRegistration = async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.redirect('/registrations/cancel');
};

exports.viewRegistrations = async (req, res) => {
  const registrations = await Registration.find().populate('eventId').populate('studentId');
  console.log(registrations)
  res.render('listRegistrations', { registrations });
};

exports.showCancelPage = async (req, res) => {
  const registrations = await Registration.find({ studentId: req.session.user._id }).populate('eventId');
  res.render('cancelRegistration', { registrations });
};


exports.searchByDate = async (req, res) => {
  const { start, end } = req.query;
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate > endDate) {
    return res.render('searchRegistrations', {
      error: 'Start date must be earlier than end date',
      registrations: []
    });
  }

  try {
    const registrations = await Registration.find({
      registrationDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('eventId');

    res.render('searchRegistrations', { registrations, error: null });
  } catch (err) {
    console.error(err);
    res.render('searchRegistrations', {
      error: 'An error occurred while searching',
      registrations: []
    });
  }
};
