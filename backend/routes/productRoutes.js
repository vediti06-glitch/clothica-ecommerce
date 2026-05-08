import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


// ================= ADD PRODUCT =================
router.post("/add", upload.array("images", 4), (req, res) => {
  const { name, description, category, subCategory, price, sizes, bestseller } = req.body;
  const id = uuidv4();

  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const images = req.files ? req.files.map(f => f.filename) : [];

  if (!name || !price || !sizes) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const sql = `
    INSERT INTO products 
    (id, name, description, category, subCategory, price, sizes, bestseller, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    id,
    name,
    description,
    category,
    subCategory,
    parseFloat(price),
    sizes,
    bestseller === "true" ? 1 : 0,
    JSON.stringify(images)
  ], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, message: "Product added" });
  });
});


// ================= GET PRODUCTS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      products: results
    });
  });
});

export default router;