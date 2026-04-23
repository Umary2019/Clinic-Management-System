const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema(
  {
    drug: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    instructions: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    diagnosis: { type: String, required: true, trim: true },
    prescription: [prescriptionItemSchema],
    notes: { type: String, default: '' },
    reportFile: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      format: { type: String, default: '' },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
