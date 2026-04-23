import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        if (user.role === 'admin') {
          const response = await dashboardAPI.admin();
          setData(response.data);
        } else if (user.role === 'doctor') {
          const response = await dashboardAPI.doctor();
          setData(response.data);
        } else {
          const response = await dashboardAPI.receptionist();
          setData(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user.role]);

  if (loading) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
          Role-based dashboard
        </p>
        <h2 className="text-3xl">{user.role[0].toUpperCase() + user.role.slice(1)} Overview</h2>
      </div>

      {user.role === 'admin' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Patients" value={data.totalPatients || 0} />
          <StatCard label="Total Doctors" value={data.totalDoctors || 0} />
          <StatCard label="Appointments" value={data.totalAppointments || 0} />
          <StatCard label="Revenue" value={`$${data.revenue || 0}`} />
        </div>
      ) : null}

      {user.role === 'doctor' ? (
        <div className="space-y-4">
          <StatCard label="Today's Appointments" value={data.totalTodayAppointments || 0} />
          <div className="card overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left">Time</th>
                  <th className="px-2 py-2 text-left">Patient</th>
                  <th className="px-2 py-2 text-left">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {data.todaysAppointments?.map((item) => (
                  <tr key={item._id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-2 py-2">{new Date(item.date).toLocaleTimeString()}</td>
                    <td className="px-2 py-2">{item.patientId?.name}</td>
                    <td className="px-2 py-2">{item.doctorId?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {(user.role === 'receptionist' || user.role === 'patient') ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card">
            <h3 className="text-xl">Recent Patients</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {data.recentPatients?.map((patient) => (
                <li key={patient._id} className="rounded-lg border p-2" style={{ borderColor: 'var(--border)' }}>
                  {patient.name} ({patient.phone})
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl">Recent Appointments</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {data.recentAppointments?.map((appointment) => (
                <li key={appointment._id} className="rounded-lg border p-2" style={{ borderColor: 'var(--border)' }}>
                  {appointment.patientId?.name} with {appointment.doctorId?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
