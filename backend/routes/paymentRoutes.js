// backend/routes/paymentRoutes.js
import express from "express";
import db from "../config/db.js"; // works from routes folder
const router = express.Router();

router.post("/payments", async (req, res) => {
  try {
    const { user_id, order_id, amount, method } = req.body;

    const [result] = await db.promise().query(
      "INSERT INTO payments (user_id, order_id, amount, method) VALUES (?, ?, ?, ?)",
      [user_id, order_id, amount, method]
    );

    res.json({ message: "Payment stored successfully", paymentId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
