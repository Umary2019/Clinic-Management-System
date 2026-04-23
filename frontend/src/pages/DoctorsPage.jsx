import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { doctorAPI } from '../services/api';

const DoctorsPage = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', specialization: '', availability: '' });

  const loadDoctors = async () => {
    try {
      const { data } = await doctorAPI.list();
      setDoctors(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await doctorAPI.create({
        name: form.name,
        specialization: form.specialization,
        availability: form.availability
          .split(',')
          .map((slot) => slot.trim())
          .filter(Boolean),
      });
      toast.success('Doctor added');
      setForm({ name: '', specialization: '', availability: '' });
      loadDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create doctor');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
      {(user.role === 'admin') ? (
        <div className="card">
          <h3 className="text-2xl">Add Doctor</h3>
          <form className="mt-4 space-y-3" onSubmit={handleCreate}>
            <input className="input" placeholder="Doctor Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="input" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm((p) => ({ ...p, specialization: e.target.value }))} required />
            <textarea className="input min-h-24" placeholder="Availability (comma separated e.g. Mon 09:00-12:00, Tue 13:00-16:00)" value={form.availability} onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))} />
            <button className="btn-primary w-full">Create Doctor</button>
          </form>
        </div>
      ) : null}

      <div className="card overflow-auto">
        <h3 className="text-2xl">Doctor List</h3>
        <table className="mt-4 min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Specialization</th>
              <th className="px-2 py-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="px-2 py-2">{doctor.name}</td>
                <td className="px-2 py-2">{doctor.specialization}</td>
                <td className="px-2 py-2">{doctor.availability?.join(', ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsPage;
