import { CalendarDays, CreditCard, FileText, LayoutDashboard, Stethoscope, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/appointments', label: 'Appts', icon: CalendarDays },
  { to: '/records', label: 'Records', icon: FileText },
  { to: '/billing', label: 'Billing', icon: CreditCard },
];

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-6 border-t lg:hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-1 py-2 text-[10px] font-medium ${
              isActive ? 'text-teal-500' : ''
            }`
          }
        >
          <Icon size={14} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
