const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');

const getPatients = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [patients, total] = await Promise.all([
      Patient.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name role'),
      Patient.countDocuments(query),
    ]);

    return res.status(200).json({
      data: patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const createPatient = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.user._id,
    };

    const patient = await Patient.create(payload);
    return res.status(201).json({ message: 'Patient created successfully', data: patient });
  } catch (error) {
    return next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json({ message: 'Patient updated successfully', data: patient });
  } catch (error) {
    return next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

const getPatientHistory = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    const [patient, records] = await Promise.all([
      Patient.findById(patientId),
      MedicalRecord.find({ patientId })
        .sort({ createdAt: -1 })
        .populate('doctorId', 'name specialization'),
    ]);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json({
      patient,
      records,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientHistory,
};
