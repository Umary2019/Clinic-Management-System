import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = ['admin', 'doctor', 'receptionist', 'patient'];

const AuthPage = () => {
  const { user, login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist',
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl md:grid-cols-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <section className="hidden flex-col justify-end bg-[linear-gradient(145deg,#115e59,#0f766e_40%,#f59e0b)] p-8 text-white md:flex">
          <p className="text-xs uppercase tracking-[0.2em]">CareFlow CMS</p>
          <h1 className="mt-3 text-4xl">Clinical Operations, Refined.</h1>
          <p className="mt-4 text-sm text-white/90">
            A complete command center for patient journey, appointments, diagnostics, and billing.
          </p>
        </section>

        <section className="p-6 md:p-10">
          <h2 className="text-3xl">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Use your clinic credentials to continue.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <>
                <input className="input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <select className="input" name="role" value={form.role} onChange={handleChange}>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          <button
            className="mt-4 text-sm font-semibold underline"
            style={{ color: 'var(--accent-strong)' }}
            onClick={() => setMode((prev) => (prev === 'login' ? 'register' : 'login'))}
          >
            {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
