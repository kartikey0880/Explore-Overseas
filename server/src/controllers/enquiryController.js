import Enquiry from '../models/Enquiry.js';

export async function createEnquiry(req, res, next) {
  try {
    const { fullName, phone, email, countryOfResidence, destination, visaType, message } = req.body;
    const enquiry = await Enquiry.create({ fullName, phone, email, countryOfResidence, destination, visaType, message });
    res.status(201).json({ message: 'Your enquiry has been submitted successfully.', enquiryId: enquiry._id });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: 'Please check the submitted details.', errors: Object.values(error.errors).map(e => e.message) });
    next(error);
  }
}

export async function listEnquiries(req, res, next) {
  try {
    const { status, search = '', page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && ['Pending','In Progress','Completed','Rejected'].includes(status)) filter.status = status;
    if (search) filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
    const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const currentPage = Math.max(Number(page) || 1, 1);
    const [items, total] = await Promise.all([
      Enquiry.find(filter).sort({ createdAt: -1 }).skip((currentPage - 1) * safeLimit).limit(safeLimit),
      Enquiry.countDocuments(filter)
    ]);
    res.json({ items, total, page: currentPage, pages: Math.ceil(total / safeLimit) });
  } catch (error) { next(error); }
}

export async function updateEnquiry(req, res, next) {
  try {
    const { status } = req.body;
    if (!['Pending','In Progress','Completed','Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const item = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ item });
  } catch (error) { next(error); }
}

export async function deleteEnquiry(req, res, next) {
  try {
    const item = await Enquiry.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) { next(error); }
}

export async function enquiryStats(req, res, next) {
  try {
    const [total, pending, inProgress, completed] = await Promise.all([
      Enquiry.countDocuments(), Enquiry.countDocuments({ status: 'Pending' }),
      Enquiry.countDocuments({ status: 'In Progress' }), Enquiry.countDocuments({ status: 'Completed' })
    ]);
    res.json({ total, pending, inProgress, completed });
  } catch (error) { next(error); }
}
