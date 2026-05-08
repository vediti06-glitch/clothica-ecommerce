import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js"; // your MySQL connection

const router = express.Router();

// Admin login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter email and password" });
    }

    db.query(
        "SELECT * FROM admins WHERE email = ?",
        [email],
        async (err, results) => {

            console.log("Login email:", email);
            console.log("DB result:", results);

            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const admin = results[0];

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: admin.id },
                process.env.JWT_SECRET || "your_jwt_secret",
                { expiresIn: "1d" }
            );

            res.json({
                user: {
                    id: admin.id,
                    username: admin.username,
                    email: admin.email
                },
                token
            });
        }
    );
});

// TEMPORARY: Test all admins login dynamically
router.get("/test-all", async (req, res) => {
  try {
    // Fetch all admins from database
    db.query("SELECT * FROM admins", async (err, rows) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });

      const results = [];
      const bcrypt = await import("bcryptjs");
      const password = "admin123"; // common password used for hashing

      for (const admin of rows) {
        const isMatch = await bcrypt.compare(password, admin.password);
        results.push({
          email: admin.email,
          username: admin.username,
          status: isMatch ? "SUCCESS" : "FAILED",
        });
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;