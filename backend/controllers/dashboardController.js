const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Billing = require('../models/Billing');

const getAdminDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [totalPatients, totalDoctors, totalAppointments, paidBills] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Billing.find({ status: 'paid' }).select('amount'),
    ]);

    const revenue = paidBills.reduce((sum, bill) => sum + bill.amount, 0);

    return res.status(200).json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      revenue,
      today,
      tomorrow,
    });
  } catch (error) {
    return next(error);
  }
};

const getDoctorDashboard = async (req, res, next) => {
  try {
    const doctorId = req.query.doctorId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const query = doctorId
      ? {
          doctorId,
          date: { $gte: today, $lt: tomorrow },
        }
      : {
          date: { $gte: today, $lt: tomorrow },
        };

    const todaysAppointments = await Appointment.find(query)
      .sort({ date: 1 })
      .populate('patientId', 'name phone')
      .populate('doctorId', 'name specialization');

    return res.status(200).json({
      totalTodayAppointments: todaysAppointments.length,
      todaysAppointments,
    });
  } catch (error) {
    return next(error);
  }
};

const getReceptionistDashboard = async (req, res, next) => {
  try {
    const [recentPatients, recentAppointments] = await Promise.all([
      Patient.find().sort({ createdAt: -1 }).limit(5),
      Appointment.find().sort({ createdAt: -1 }).limit(5).populate('patientId doctorId', 'name'),
    ]);

    return res.status(200).json({
      recentPatients,
      recentAppointments,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAdminDashboard,
  getDoctorDashboard,
  getReceptionistDashboard,
};
