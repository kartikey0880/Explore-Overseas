import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 25 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 150 },
  countryOfResidence: { type: String, required: true, trim: true, maxlength: 80 },
  destination: { type: String, required: true, enum: ['USA','Canada','UK','Australia','Europe','New Zealand','Japan','South Korea','Other'] },
  visaType: { type: String, enum: ['Tourist Visa','Visitor Visa','Business Visa','Not sure'], default: 'Not sure' },
  message: { type: String, trim: true, maxlength: 2000, default: '' },
  status: { type: String, enum: ['Pending','In Progress','Completed','Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
