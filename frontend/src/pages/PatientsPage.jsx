import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { patientAPI } from '../services/api';
import { exportPatientReportPDF } from '../utils/exportPatientReport';

const initialForm = {
  name: '',
  age: '',
  gender: 'male',
  phone: '',
  address: '',
  medicalHistory: '',
};

const PatientsPage = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(initialForm);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = async (page = 1, keyword = search) => {
    try {
      const { data } = await patientAPI.list({ page, limit: 8, search: keyword });
      setPatients(data.data);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load patients');
    }
  };

  useEffect(() => {
    fetchPatients(1, '');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedPatient) {
        await patientAPI.update(selectedPatient._id, form);
        toast.success('Patient updated');
      } else {
        await patientAPI.create({ ...form, age: Number(form.age) });
        toast.success('Patient added');
      }
      setForm(initialForm);
      setSelectedPatient(null);
      fetchPatients(pagination.page, search);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save patient');
    }
  };

  const onEdit = (patient) => {
    setSelectedPatient(patient);
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;

    try {
      await patientAPI.remove(id);
      toast.success('Patient deleted');
      fetchPatients(pagination.page, search);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete patient');
    }
  };

  const loadHistory = async (patient) => {
    try {
      const { data } = await patientAPI.history(patient._id);
      exportPatientReportPDF(data.patient, data.records || []);
      toast.success('PDF report exported');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(280px,360px)_1fr]">
      <div className="card">
        <div className="section-head">
          <h3 className="text-2xl">{selectedPatient ? 'Edit Patient' : 'Add Patient'}</h3>
          <span className="badge">Patient Form</span>
        </div>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input className="input" type="number" placeholder="Age" value={form.age} onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))} required />
          <select className="input" value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
          <input className="input" placeholder="Address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required />
          <textarea className="input min-h-24" placeholder="Medical History" value={form.medicalHistory} onChange={(e) => setForm((p) => ({ ...p, medicalHistory: e.target.value }))} />

          <button className="btn-primary w-full">{selectedPatient ? 'Update Patient' : 'Create Patient'}</button>
          {selectedPatient ? (
            <button
              type="button"
              className="btn-secondary w-full"
              onClick={() => {
                setSelectedPatient(null);
                setForm(initialForm);
              }}
            >
              Cancel Edit
            </button>
          ) : null}
        </form>
      </div>

      <div className="space-y-4">
        <div className="card">
          <div className="section-head">
            <h3 className="text-2xl">Patient Directory</h3>
            <span className="badge">Search</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              className="input"
              placeholder="Search by name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-primary w-full sm:w-auto" onClick={() => fetchPatients(1, search)}>
              Search
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left">Name</th>
                <th className="px-2 py-2 text-left">Age</th>
                <th className="px-2 py-2 text-left">Phone</th>
                <th className="px-2 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-2 py-2">{patient.name}</td>
                  <td className="px-2 py-2">{patient.age}</td>
                  <td className="px-2 py-2">{patient.phone}</td>
                  <td className="px-2 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button className="btn-secondary" onClick={() => onEdit(patient)}>
                        Edit
                      </button>
                      {(user.role === 'admin') ? (
                        <button className="btn-secondary" onClick={() => onDelete(patient._id)}>
                          Delete
                        </button>
                      ) : null}
                      <button className="btn-secondary" onClick={() => loadHistory(patient)}>
                        Export PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="surface-muted flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
          <button
            className="btn-secondary"
            disabled={pagination.page <= 1}
            onClick={() => fetchPatients(pagination.page - 1, search)}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {pagination.page} / {pagination.totalPages || 1}
          </span>
          <button
            className="btn-secondary"
            disabled={pagination.page >= (pagination.totalPages || 1)}
            onClick={() => fetchPatients(pagination.page + 1, search)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
