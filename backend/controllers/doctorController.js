const Doctor = require('../models/Doctor');

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 }).populate('userId', 'name email');
    return res.status(200).json({ data: doctors });
  } catch (error) {
    return next(error);
  }
};

const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    return res.status(201).json({ message: 'Doctor created successfully', data: doctor });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDoctors,
  createDoctor,
};
