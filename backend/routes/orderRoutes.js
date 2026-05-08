import express from "express";
import db from "../config/db.js"; // works from routes folder
const router = express.Router();

/* PLACE ORDER */
router.post("/place", (req, res) => {
  try {
    const { user_id, items, total_amount, payment_method } = req.body;

    console.log("REQ BODY:", req.body);

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items" });
    }

    const orderSql =
      "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)";

    db.query(orderSql, [user_id, total_amount, "Placed"], (err, orderResult) => {
      if (err) {
        console.error("ORDER ERROR:", err);
        return res.status(500).json({ message: "Order insert failed" });
      }

      const orderId = orderResult.insertId;

      const validItems = items.filter(item => {
  if (!item.product_id || !item.price || !item.quantity) {
    console.error("❌ INVALID ITEM:", item);
    return false;
  }
  return true;
});

if (validItems.length === 0) {
  return res.status(400).json({ message: "All items invalid" });
}

const values = validItems.map(item => [
  orderId,
  String(item.product_id),
  item.size || null,
  Number(item.quantity),
  Number(item.price)
]);

console.log("VALID VALUES:", values);

      const itemSql =
        "INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES ?";

      db.query(itemSql, [values], (err) => {
        if (err) {
          console.error("ITEM ERROR:", err);
          return res.status(500).json({ message: "Items insert failed" });
        }

        const paymentSql =
          "INSERT INTO payments (user_id, order_id, amount, method) VALUES (?, ?, ?, ?)";

        db.query(
          paymentSql,
          [user_id, orderId, total_amount, payment_method],
          (err) => {
            if (err) {
              console.error("PAYMENT ERROR:", err);
              return res.status(500).json({ message: "Payment failed" });
            }

            res.json({
              message: "Order placed successfully",
              order_id: orderId,
            });
          }
        );
      });
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ message: "Server crashed" });
  }
});
/* GET ORDERS */
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT o.id, o.total_amount, o.status, o.created_at,
           oi.product_id, oi.size, oi.quantity, oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("GET ORDERS ERROR:", err);
      return res.status(500).json(err);
    }
    console.log("GET ORDERS RESULT:", result);
    res.json(result);
  });
});
export default router;