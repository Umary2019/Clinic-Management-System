import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { appointmentAPI, doctorAPI, patientAPI } from '../services/api';

const AppointmentsPage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({ date: '', doctorId: '', patientId: '', status: '' });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '', status: 'pending' });

  const loadMasterData = async () => {
    try {
      const [patientsResponse, doctorsResponse] = await Promise.all([
        patientAPI.list({ page: 1, limit: 200 }),
        doctorAPI.list(),
      ]);
      setPatients(patientsResponse.data.data || []);
      setDoctors(doctorsResponse.data.data || []);
    } catch (error) {
      toast.error('Failed to load patients/doctors');
    }
  };

  const loadAppointments = async (page = 1) => {
    try {
      const { data } = await appointmentAPI.list({ ...filters, page, limit: 8 });
      setAppointments(data.data || []);
      setPagination(data.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    loadMasterData();
    loadAppointments(1);
  }, []);

  const createAppointment = async (event) => {
    event.preventDefault();
    try {
      await appointmentAPI.create(form);
      toast.success('Appointment booked');
      setForm({ patientId: '', doctorId: '', date: '', status: 'pending' });
      loadAppointments(1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, { status });
      toast.success('Status updated');
      loadAppointments(pagination.page);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="card">
          <h3 className="text-2xl">Book Appointment</h3>
          <form className="mt-4 space-y-3" onSubmit={createAppointment}>
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
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
            <input className="input" type="datetime-local" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
            <select className="input" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn-primary w-full">Book</button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card grid gap-3 md:grid-cols-4">
            <input className="input" type="date" value={filters.date} onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value }))} />
            <select className="input" value={filters.doctorId} onChange={(e) => setFilters((p) => ({ ...p, doctorId: e.target.value }))}>
              <option value="">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            <select className="input" value={filters.patientId} onChange={(e) => setFilters((p) => ({ ...p, patientId: e.target.value }))}>
              <option value="">All Patients</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={() => loadAppointments(1)}>
              Apply Filters
            </button>
          </div>

          <div className="card overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left">Patient</th>
                  <th className="px-2 py-2 text-left">Doctor</th>
                  <th className="px-2 py-2 text-left">Date</th>
                  <th className="px-2 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item._id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-2 py-2">{item.patientId?.name}</td>
                    <td className="px-2 py-2">{item.doctorId?.name}</td>
                    <td className="px-2 py-2">{new Date(item.date).toLocaleString()}</td>
                    <td className="px-2 py-2">
                      <select
                        className="input"
                        value={item.status}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <button className="btn-secondary" disabled={pagination.page <= 1} onClick={() => loadAppointments(pagination.page - 1)}>
              Prev
            </button>
            <span className="text-sm">Page {pagination.page} / {pagination.totalPages || 1}</span>
            <button
              className="btn-secondary"
              disabled={pagination.page >= (pagination.totalPages || 1)}
              onClick={() => loadAppointments(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
