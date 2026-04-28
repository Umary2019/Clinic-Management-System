import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';

const roles = ['admin', 'doctor', 'receptionist', 'patient'];
const genders = ['male', 'female'];

const RegisterPage = () => {
  const { user, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'receptionist',
    gender: 'male',
    age: '',
    address: '',
    phone: '',
  });

  if (user) {
    return <Navigate to="/app" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (form.role === 'patient') {
      const requiredFields = ['gender', 'age', 'address', 'phone'];
      const hasMissingField = requiredFields.some((field) => !String(form[field]).trim());

      if (hasMissingField) {
        toast.error('Please complete gender, age, address, and phone number');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      if (form.role === 'patient') {
        payload.gender = form.gender;
        payload.age = Number(form.age);
        payload.address = form.address;
        payload.phone = form.phone;
      }

      await register(payload);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Set up a role-based clinic profile"
      ctaText="Already have an account?"
      ctaTo="/login"
      ctaLabel="Sign in"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <select
          className="input"
          value={form.role}
          onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {form.role === 'patient' ? (
          <>
            <select
              className="input"
              value={form.gender}
              onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
              required
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <input
              className="input"
              type="number"
              min="0"
              max="130"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
              required
            />
            <input
              className="input"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
              required
            />
            <input
              className="input"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
          </>
        ) : null}
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <div className="relative">
          <input
            className="input pr-11"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            minLength={6}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-[var(--text-soft)] transition hover:text-[var(--text)]"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <input
            className="input pr-11"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            minLength={6}
            required
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-[var(--text-soft)] transition hover:text-[var(--text)]"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;
