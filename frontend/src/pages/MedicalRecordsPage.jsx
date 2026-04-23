import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { doctorAPI, patientAPI, recordAPI } from '../services/api';

const MedicalRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [patientFilter, setPatientFilter] = useState('');
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    notes: '',
    prescription: [{ drug: '', dosage: '', instructions: '' }],
    reportFile: null,
  });

  useEffect(() => {
    const loadBase = async () => {
      try {
        const [patientsResponse, doctorsResponse] = await Promise.all([
          patientAPI.list({ page: 1, limit: 200 }),
          doctorAPI.list(),
        ]);
        setPatients(patientsResponse.data.data || []);
        setDoctors(doctorsResponse.data.data || []);
      } catch (error) {
        toast.error('Failed to load doctors/patients');
      }
    };

    loadBase();
  }, []);

  const loadRecords = async () => {
    if (!patientFilter) return;

    try {
      const { data } = await recordAPI.byPatient(patientFilter);
      setRecords(data.data || []);
    } catch (error) {
      toast.error('Failed to load records');
    }
  };

  const updatePrescription = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.prescription];
      next[index][key] = value;
      return { ...prev, prescription: next };
    });
  };

  const addPrescriptionRow = () => {
    setForm((prev) => ({
      ...prev,
      prescription: [...prev.prescription, { drug: '', dosage: '', instructions: '' }],
    }));
  };

  const submitRecord = async (event) => {
    event.preventDefault();

    try {
      const payload = new FormData();
      payload.append('patientId', form.patientId);
      payload.append('doctorId', form.doctorId);
      payload.append('diagnosis', form.diagnosis);
      payload.append('notes', form.notes);
      payload.append('prescription', JSON.stringify(form.prescription));
      if (form.reportFile) payload.append('reportFile', form.reportFile);

      await recordAPI.create(payload);
      toast.success('Medical record created');
      setForm({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        notes: '',
        prescription: [{ drug: '', dosage: '', instructions: '' }],
        reportFile: null,
      });
      if (patientFilter) loadRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create record');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
      <div className="card">
        <h3 className="text-2xl">Add Medical Record</h3>
        <form className="mt-4 space-y-3" onSubmit={submitRecord}>
          <select className="input" value={form.patientId} onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))} required>
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>

          <select className="input" value={form.doctorId} onChange={(e) => setForm((p) => ({ ...p, doctorId: e.target.value }))} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>

          <textarea className="input min-h-20" placeholder="Diagnosis" value={form.diagnosis} onChange={(e) => setForm((p) => ({ ...p, diagnosis: e.target.value }))} required />
          <textarea className="input min-h-20" placeholder="Notes" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />

          <div className="space-y-2">
            <p className="text-sm font-semibold">Prescription</p>
            {form.prescription.map((item, index) => (
              <div key={index} className="rounded-xl border p-2" style={{ borderColor: 'var(--border)' }}>
                <input className="input mb-2" placeholder="Drug" value={item.drug} onChange={(e) => updatePrescription(index, 'drug', e.target.value)} required />
                <input className="input mb-2" placeholder="Dosage" value={item.dosage} onChange={(e) => updatePrescription(index, 'dosage', e.target.value)} required />
                <input className="input" placeholder="Instructions" value={item.instructions} onChange={(e) => updatePrescription(index, 'instructions', e.target.value)} required />
              </div>
            ))}
            <button type="button" className="btn-secondary w-full" onClick={addPrescriptionRow}>
              Add Drug
            </button>
          </div>

          <input className="input" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setForm((p) => ({ ...p, reportFile: e.target.files?.[0] || null }))} />

          <button className="btn-primary w-full">Save Record</button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="card flex gap-2">
          <select className="input" value={patientFilter} onChange={(e) => setPatientFilter(e.target.value)}>
            <option value="">Select patient to view records</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
          <button className="btn-primary" onClick={loadRecords}>
            Load
          </button>
        </div>

        <div className="card space-y-3">
          {records.map((record) => (
            <div key={record._id} className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
              <p className="font-semibold">Diagnosis: {record.diagnosis}</p>
              <p className="text-sm">Doctor: {record.doctorId?.name || 'N/A'}</p>
              <p className="text-sm">Notes: {record.notes || '-'}</p>
              <div className="mt-2 text-sm">
                <p className="font-semibold">Prescription:</p>
                <ul className="mt-1 list-disc pl-5">
                  {record.prescription?.map((item, index) => (
                    <li key={index}>
                      {item.drug} - {item.dosage} ({item.instructions})
                    </li>
                  ))}
                </ul>
              </div>
              {record.reportFile?.url ? (
                <a className="mt-2 inline-block text-sm font-semibold underline" href={record.reportFile.url} target="_blank" rel="noreferrer">
                  Open report file
                </a>
              ) : null}
            </div>
          ))}
          {records.length === 0 ? <p className="text-sm">No records found.</p> : null}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
