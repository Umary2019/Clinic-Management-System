import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { billingAPI, patientAPI } from '../services/api';

const BillingPage = () => {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({
    patientId: '',
    services: [{ title: '', cost: '' }],
    status: 'unpaid',
  });

  const loadPatients = async () => {
    try {
      const { data } = await patientAPI.list({ page: 1, limit: 200 });
      setPatients(data.data || []);
    } catch (error) {
      toast.error('Failed to load patients');
    }
  };

  const loadBills = async () => {
    try {
      const { data } = await billingAPI.list({ status: statusFilter || undefined });
      setBills(data.data || []);
    } catch (error) {
      toast.error('Failed to load bills');
    }
  };

  useEffect(() => {
    loadPatients();
    loadBills();
  }, []);

  const addServiceRow = () => {
    setForm((prev) => ({
      ...prev,
      services: [...prev.services, { title: '', cost: '' }],
    }));
  };

  const updateService = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.services];
      next[index][key] = value;
      return { ...prev, services: next };
    });
  };

  const total = form.services.reduce((acc, item) => acc + Number(item.cost || 0), 0);

  const submitBill = async (event) => {
    event.preventDefault();
    try {
      await billingAPI.create({
        patientId: form.patientId,
        services: form.services.map((item) => ({ ...item, cost: Number(item.cost) })),
        status: form.status,
      });
      toast.success('Bill generated');
      setForm({ patientId: '', services: [{ title: '', cost: '' }], status: 'unpaid' });
      loadBills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate bill');
    }
  };

  const updateBillStatus = async (id, status) => {
    try {
      await billingAPI.updateStatus(id, { status });
      toast.success('Billing status updated');
      loadBills();
    } catch (error) {
      toast.error('Unable to update status');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(280px,380px)_1fr]">
      <div className="card">
        <div className="section-head">
          <h3 className="text-2xl">Generate Bill</h3>
          <span className="badge">Billing Desk</span>
        </div>
        <form className="mt-4 space-y-3" onSubmit={submitBill}>
          <select className="input" value={form.patientId} onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))} required>
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>

          {form.services.map((service, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <input className="input" placeholder="Service" value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} required />
              <input className="input" type="number" min="0" placeholder="Cost" value={service.cost} onChange={(e) => updateService(index, 'cost', e.target.value)} required />
            </div>
          ))}

          <button type="button" className="btn-secondary w-full" onClick={addServiceRow}>
            Add Service
          </button>

          <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
              Calculated Total
            </p>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>

          <select className="input" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>

          <button className="btn-primary w-full">Create Bill</button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="card grid gap-2 sm:grid-cols-[1fr_auto]">
          <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button className="btn-primary w-full sm:w-auto" onClick={loadBills}>
            Filter
          </button>
        </div>

        <div className="table-wrap">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left">Patient</th>
                <th className="px-2 py-2 text-left">Amount</th>
                <th className="px-2 py-2 text-left">Services</th>
                <th className="px-2 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-2 py-2">{bill.patientId?.name || '-'}</td>
                  <td className="px-2 py-2">${Number(bill.amount).toFixed(2)}</td>
                  <td className="px-2 py-2">{bill.services?.map((item) => item.title).join(', ')}</td>
                  <td className="px-2 py-2">
                    <select className="input" value={bill.status} onChange={(e) => updateBillStatus(bill._id, e.target.value)}>
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
