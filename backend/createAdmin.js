import mysql from "mysql2";
import bcrypt from "bcrypt";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "stylecart"
});
const username = "admin2";
const email = "admin2@stylecart.com";
const plainPassword = "admin123";

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;

  const sql = "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)";
  
  db.query(sql, [username, email, hash], (err, result) => {
    if (err) throw err;
    console.log("Admin created ✅", result);
    db.end();
  });
});