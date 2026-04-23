import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('cms_theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('cms_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-10 border-b px-4 py-4 backdrop-blur md:px-8" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
            Operations Hub
          </p>
          <h2 className="text-xl">Clinic Management System</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
