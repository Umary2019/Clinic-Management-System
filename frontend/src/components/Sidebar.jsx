import { CalendarDays, CreditCard, FileText, LayoutDashboard, Stethoscope, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/patients', label: 'Patients', icon: Users },
  { to: '/app/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/app/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/app/records', label: 'Medical Records', icon: FileText },
  { to: '/app/billing', label: 'Billing', icon: CreditCard },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r px-6 py-7 lg:flex" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 88%, transparent)' }}>
      <div>
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
          Clinic CMS
        </p>
        <h1 className="mt-2 text-2xl leading-tight">CareFlow Console</h1>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-[var(--bg-soft)]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="surface-muted p-4">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
          Signed in as
        </p>
        <p className="mt-2 font-semibold">{user?.name}</p>
        <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
          {user?.role}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
