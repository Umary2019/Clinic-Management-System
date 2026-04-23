const StatCard = ({ label, value, hint }) => {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {hint ? (
        <p className="mt-1 text-sm" style={{ color: 'var(--text-soft)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default StatCard;
