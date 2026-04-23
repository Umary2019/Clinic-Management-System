import { CalendarDays, CreditCard, FileText, LayoutDashboard, Stethoscope, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/app', label: 'Home', icon: LayoutDashboard },
  { to: '/app/patients', label: 'Patients', icon: Users },
  { to: '/app/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/app/appointments', label: 'Appts', icon: CalendarDays },
  { to: '/app/records', label: 'Records', icon: FileText },
  { to: '/app/billing', label: 'Billing', icon: CreditCard },
];

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-6 border-t px-1 pb-[calc(env(safe-area-inset-bottom,0)+0.25rem)] pt-1 backdrop-blur lg:hidden" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 90%, transparent)' }}>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/app'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition ${
              isActive ? 'bg-[var(--accent-soft)] text-teal-700 dark:text-teal-300' : 'text-[var(--text-soft)]'
            }`
          }
        >
          <Icon size={15} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
