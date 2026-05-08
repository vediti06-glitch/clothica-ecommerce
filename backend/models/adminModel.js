// backend/models/adminModel.js
import db from '../config/db.js';

// Get admin by email
export const findAdminByEmail = (email, callback) => {
    const query = "SELECT * FROM admins WHERE email = ?";
    db.query(query, [email], callback);
};