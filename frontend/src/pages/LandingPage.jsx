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
    <div className="min-h-screen py-5 md:py-7">
      <header className="page-shell">
        <div className="section-head rounded-2xl border px-4 py-3 sm:px-5" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 82%, transparent)' }}>
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
            Clinic Management System
          </p>
          <h1 className="text-xl sm:text-2xl">CareFlow</h1>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Register</Link>
        </div>
        </div>
      </header>

      <div className="page-shell mt-5 page-stack">
        <section className="page-hero grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <div>
            <span className="badge">Modern Clinical Command Center</span>
            <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">A faster way to run patient care, appointments, and billing.</h2>
            <p className="mt-4 max-w-xl text-sm md:text-base" style={{ color: 'var(--text-soft)' }}>
              CareFlow CMS helps your clinic teams collaborate in real time with role-based workflows for admin, doctor, receptionist, and patient portals.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                Start Free Demo <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/login" className="btn-secondary">Access Existing Workspace</Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="surface-muted p-3">
                <p className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-soft)' }}>Avg Intake Time</p>
                <p className="mt-1 text-lg font-semibold">-41%</p>
              </div>
              <div className="surface-muted p-3">
                <p className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-soft)' }}>Ops Visibility</p>
                <p className="mt-1 text-lg font-semibold">Real-time</p>
              </div>
              <div className="surface-muted p-3">
                <p className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-soft)' }}>Compliance</p>
                <p className="mt-1 text-lg font-semibold">Role secured</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 90%, transparent)' }}>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>Daily Snapshot</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="surface-muted p-3"><strong>126</strong><br />Patients</div>
                <div className="surface-muted p-3"><strong>34</strong><br />Doctors</div>
                <div className="surface-muted p-3"><strong>57</strong><br />Appointments</div>
                <div className="surface-muted p-3"><strong>$18.4k</strong><br />Revenue</div>
              </div>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg-panel) 88%, transparent)' }}>
              <p className="text-sm font-semibold">Built for real clinic operations</p>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                Designed with secure APIs, clean dashboards, and responsive workflows that scale from single clinics to multi-branch hospitals.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(({ title, desc, icon: Icon }) => (
            <article key={title} className="card p-5">
              <div className="mb-3 inline-flex rounded-xl bg-[var(--bg-soft)] p-2">
                <Icon size={18} />
              </div>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>{desc}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
