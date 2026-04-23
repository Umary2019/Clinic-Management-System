const Billing = require('../models/Billing');

const calculateTotal = (services = []) =>
  services.reduce((acc, item) => acc + Number(item.cost || 0), 0);

const createBill = async (req, res, next) => {
  try {
    const { patientId, services = [], status } = req.body;
    const amount = calculateTotal(services);

    const billing = await Billing.create({
      patientId,
      services,
      amount,
      status: status || 'unpaid',
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: 'Bill generated successfully', data: billing });
  } catch (error) {
    return next(error);
  }
};

const getBills = async (req, res, next) => {
  try {
    const status = req.query.status || '';
    const query = status ? { status } : {};

    const bills = await Billing.find(query)
      .sort({ createdAt: -1 })
      .populate('patientId', 'name phone')
      .populate('createdBy', 'name role');

    return res.status(200).json({ data: bills });
  } catch (error) {
    return next(error);
  }
};

const updateBillStatus = async (req, res, next) => {
  try {
    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    return res.status(200).json({ message: 'Bill status updated', data: bill });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBill,
  getBills,
  updateBillStatus,
};
