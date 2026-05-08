import db from "../config/db.js";

// ADD PRODUCT
export const addProduct = (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const sql = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, price, description, image], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true, message: "Product Added" });
  });
};

// GET PRODUCTS
export const listProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({ success: true, products: result });
  });
};