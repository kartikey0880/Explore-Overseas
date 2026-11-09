import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('Admin seed skipped: set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env');
    return;
  }
  const exists = await Admin.findOne({ email });
  if (!exists) {
    const hash = await bcrypt.hash(password, 12);
    await Admin.create({ name: process.env.ADMIN_NAME || 'Administrator', email, password: hash });
    console.log(`Initial admin created: ${email}`);
  }
}
