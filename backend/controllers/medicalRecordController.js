const MedicalRecord = require('../models/MedicalRecord');

const parsePrescription = (rawPrescription) => {
  if (!rawPrescription) return [];

  if (Array.isArray(rawPrescription)) {
    return rawPrescription;
  }

  try {
    return JSON.parse(rawPrescription);
  } catch (error) {
    return [];
  }
};

const createMedicalRecord = async (req, res, next) => {
  try {
    const prescription = parsePrescription(req.body.prescription);

    const payload = {
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      diagnosis: req.body.diagnosis,
      prescription,
      notes: req.body.notes,
      createdBy: req.user._id,
    };

    if (req.file) {
      payload.reportFile = {
        url: req.file.path,
        publicId: req.file.filename,
        format: req.file.format || '',
      };
    }

    const record = await MedicalRecord.create(payload);
    return res.status(201).json({ message: 'Medical record created successfully', data: record });
  } catch (error) {
    return next(error);
  }
};

const getMedicalRecordsByPatient = async (req, res, next) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId })
      .sort({ createdAt: -1 })
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name');

    return res.status(200).json({ data: records });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecordsByPatient,
};
