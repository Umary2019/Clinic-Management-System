import { ArrowRight, CalendarDays, CreditCard, FileText, ShieldCheck, Users } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    title: 'Patient Lifecycle',
    desc: 'From onboarding to medical history with searchable records and timeline tracking.',
    icon: Users,
  },
  {
    title: 'Smart Appointments',
    desc: 'Book, assign, filter, and track every appointment across roles and statuses.',
    icon: CalendarDays,
  },
  {
    title: 'Clinical Records',
    desc: 'Diagnosis, prescriptions, and report uploads in one secure medical record system.',
    icon: FileText,
  },
  {
    title: 'Billing Engine',
    desc: 'Service-level billing, automatic totals, and paid or unpaid tracking.',
    icon: CreditCard,
  },
  {
    title: 'Secure By Design',
    desc: 'JWT auth, role-based controls, request validation, and hardened API headers.',
    icon: ShieldCheck,
  },
];

const LandingPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 82%, transparent)' }}>
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
            Clinic Management System
          </p>
          <h1 className="text-xl">CareFlow</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Register</Link>
        </div>
      </header>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-6 rounded-3xl border p-6 md:grid-cols-2 md:p-10" style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
            Modern Clinical Command Center
          </p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">A faster way to run patient care, appointments, and billing.</h2>
          <p className="mt-4 max-w-xl text-sm md:text-base" style={{ color: 'var(--text-soft)' }}>
            CareFlow CMS helps your clinic teams collaborate in real time with role-based workflows for admin, doctor, receptionist, and patient portals.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              Start Free Demo <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/login" className="btn-secondary">Access Existing Workspace</Link>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>Daily Snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[var(--bg-soft)] p-3"><strong>126</strong><br />Patients</div>
              <div className="rounded-xl bg-[var(--bg-soft)] p-3"><strong>34</strong><br />Doctors</div>
              <div className="rounded-xl bg-[var(--bg-soft)] p-3"><strong>57</strong><br />Appointments</div>
              <div className="rounded-xl bg-[var(--bg-soft)] p-3"><strong>$18.4k</strong><br />Revenue</div>
            </div>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm font-semibold">Built for real clinic operations</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
              Designed with secure APIs, clean dashboards, and responsive workflows that scale from single clinics to multi-branch hospitals.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, desc, icon: Icon }) => (
          <article key={title} className="card">
            <div className="mb-3 inline-flex rounded-xl bg-[var(--bg-soft)] p-2">
              <Icon size={18} />
            </div>
            <h3 className="text-xl">{title}</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>{desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
