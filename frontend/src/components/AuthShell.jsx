import { Link } from 'react-router-dom';

const AuthShell = ({
  title,
  subtitle,
  ctaText,
  ctaTo,
  ctaLabel,
  children,
}) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 md:py-10">
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div
        className="grid w-full max-w-6xl overflow-hidden rounded-3xl border shadow-2xl md:grid-cols-2"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}
      >
        <section className="hidden flex-col justify-between bg-[linear-gradient(140deg,#0f766e,#0f766e_45%,#f59e0b)] p-8 text-white md:flex lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/90">CareFlow CMS</p>
            <h1 className="mt-4 text-3xl leading-tight lg:text-4xl">Run your clinic with clinical precision and modern speed.</h1>
            <p className="mt-4 text-sm text-white/90">
              Unified access for admins, doctors, and receptionists with appointments, records, and billing in one secure workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/30 bg-white/10 p-3">JWT + RBAC Security</div>
            <div className="rounded-xl border border-white/30 bg-white/10 p-3">Cloudinary Reports</div>
            <div className="rounded-xl border border-white/30 bg-white/10 p-3">Role Dashboards</div>
            <div className="rounded-xl border border-white/30 bg-white/10 p-3">Billing & Exports</div>
          </div>
        </section>

        <section className="p-5 sm:p-6 md:p-10">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
              {subtitle}
            </p>

            <div className="mt-6">{children}</div>

            <p className="mt-6 text-sm" style={{ color: 'var(--text-soft)' }}>
              {ctaText}{' '}
              <Link className="font-semibold underline" style={{ color: 'var(--accent-strong)' }} to={ctaTo}>
                {ctaLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthShell;
