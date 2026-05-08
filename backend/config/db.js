import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vediti@08", // your MySQL password
  database: "stylecart"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("MySQL connected ✅");
  }
});

export default db;