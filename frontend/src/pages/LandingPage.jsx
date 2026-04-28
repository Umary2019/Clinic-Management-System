import { ArrowRight, BarChart3, Bell, CalendarDays, CreditCard, FileText, MonitorSmartphone, Users } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    title: 'Online Scheduling',
    desc: 'Give staff a fast way to book, move, and track visits without breaking the flow of the front desk.',
    icon: CalendarDays,
  },
  {
    title: 'Digital Intake',
    desc: 'Collect patient details, visit context, and history before the appointment begins.',
    icon: FileText,
  },
  {
    title: 'Patient Communication',
    desc: 'Keep follow-up and reminders organized so the team can stay ahead of every visit.',
    icon: Bell,
  },
  {
    title: 'Billing & Payments',
    desc: 'Track totals, visit charges, and payment status in a clear workflow for the finance team.',
    icon: CreditCard,
  },
  {
    title: 'Role-Based Workspaces',
    desc: 'Admin, doctor, receptionist, and patient views stay focused on the work each role needs.',
    icon: Users,
  },
  {
    title: 'Practice Insights',
    desc: 'See the clinic at a glance with lightweight visibility into activity, flow, and workload.',
    icon: BarChart3,
  },
];

const workflows = [
  'One workspace for scheduling, intake, records, and billing',
  'Designed for front-office speed and smoother patient flow',
  'Responsive on desktop and mobile for daily clinic use',
];

const numbers = [
  { label: 'Clinic flows', value: '4' },
  { label: 'Daily workspaces', value: '4' },
  { label: 'Mobile ready', value: '100%' },
];

const pillars = [
  {
    title: 'One platform for the patient journey',
    desc: 'Inspired by the strongest clinic software pages, the experience starts with intake and continues through billing and follow-up in one place.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Front office speed',
    desc: 'The layout emphasizes the work that matters most at the desk: booking, check-in, assignment, and patient coordination.',
    icon: Bell,
  },
  {
    title: 'Practice efficiency',
    desc: 'The system focuses on reducing friction for staff so the clinic can move through the day with less manual effort.',
    icon: BarChart3,
  },
];

const LandingPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen py-5 md:py-7 landing-root">
      <header className="page-shell">
        <div className="landing-nav section-head rounded-3xl border px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="landing-mark h-11 w-11 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <MonitorSmartphone size={20} />
            </div>
            <div>
              <p className="landing-kicker" style={{ color: 'var(--text-soft)' }}>
                Clinic Management System
              </p>
              <h1 className="text-xl sm:text-2xl">CareFlow CMS</h1>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </header>

      <div className="page-shell mt-5 page-stack">
        <section className="page-hero landing-hero grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          <div className="relative z-10">
            <span className="badge landing-badge">Modern clinic software</span>
            <h2 className="landing-title mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A modern clinic workspace built around the full patient journey.
            </h2>
            <p className="landing-copy mt-4 text-sm md:text-base lg:text-lg">
              Built to feel like the polished clinic platforms people expect today, CareFlow CMS keeps scheduling, intake, communication, records, and billing in one focused experience.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary landing-cta">
                Explore the Platform <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/login" className="btn-secondary landing-ghost">
                Continue to Login
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {numbers.map(({ label, value }) => (
                <div key={label} className="landing-stat landing-chip surface-muted p-4">
                  <p className="landing-kicker" style={{ color: 'var(--text-soft)' }}>
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {workflows.map((item) => (
                <div key={item} className="landing-pill landing-chip surface-muted px-4 py-3 text-sm" style={{ color: 'var(--text)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="landing-glow" aria-hidden="true" />
            <div className="landing-dashboard relative overflow-hidden rounded-[28px] border p-5 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="landing-kicker" style={{ color: 'var(--text-soft)' }}>
                    Clinic snapshot
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Designed for front office control</h3>
                </div>
                <span className="badge">Clinic workspace</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="landing-card-accent rounded-2xl p-4">
                  <p className="landing-kicker text-white/70">Today&apos;s schedule</p>
                  <p className="mt-3 text-4xl font-semibold text-white">24</p>
                  <p className="mt-1 text-sm text-white/80">Appointments queued across the clinic day.</p>
                </div>
                <div className="landing-card-panel rounded-2xl p-4">
                  <p className="landing-kicker" style={{ color: 'var(--text-soft)' }}>
                    Roles in focus
                  </p>
                  <p className="mt-3 text-2xl font-semibold">Admin, Doctor, Receptionist, Patient</p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                    Each role gets a clean workspace for the work they actually need to do.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="landing-card-panel rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold tracking-[-0.03em]">Platform modules</p>
                    <span className="text-xs" style={{ color: 'var(--text-soft)' }}>
                      One flow
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {['Scheduling and front-desk booking', 'Patient intake and arrival flow', 'Visit notes and medical records', 'Billing and payment tracking'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border px-3 py-2" style={{ borderColor: 'var(--border)' }}>
                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="landing-card-panel rounded-2xl p-4">
                  <p className="text-sm font-semibold tracking-[-0.03em]">What clinics expect</p>
                  <div className="mt-4 space-y-3 text-sm" style={{ color: 'var(--text-soft)' }}>
                    <div>Faster patient booking</div>
                    <div>Cleaner intake and handoff</div>
                    <div>Clear record keeping</div>
                    <div>Smoother billing follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {pillars.map(({ title, desc, icon: Icon }) => (
            <article key={title} className="landing-feature card p-5">
              <div className="mb-4 inline-flex rounded-2xl bg-[var(--bg-soft)] p-3">
                <Icon size={18} />
              </div>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                {desc}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(({ title, desc, icon: Icon }) => (
            <article key={title} className="landing-feature card p-5">
              <div className="mb-4 inline-flex rounded-2xl bg-[var(--bg-soft)] p-3">
                <Icon size={18} />
              </div>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                {desc}
              </p>
            </article>
          ))}
        </section>

        <section className="panel p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h3 className="landing-section-title">Built for busy clinic teams.</h3>
              <p className="landing-section-copy mt-3">
                The landing page now matches the kind of clinic software that feels clean, direct, and professional. It centers on the work clinics actually do every day: scheduling, intake, patient handoffs, records, and billing.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/register" className="btn-primary landing-cta">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/login" className="btn-secondary landing-ghost">
                Login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
