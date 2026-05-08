// backend/controllers/adminController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findAdminByEmail } from '../models/adminModel.js';

export const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    findAdminByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const admin = results[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "1d" }
        );

        res.json({ user: { email: admin.email, role: admin.role }, token });
    });
};