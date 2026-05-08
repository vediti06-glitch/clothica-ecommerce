import bcrypt from "bcryptjs";
import db from "./config/db.js"; // same path as your project

bcrypt.hash("admin123", 10).then((hash) => {
  db.query("UPDATE admins SET password = ?", [hash], (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("✅ All admin passwords reset to 'admin123'");
    }
    db.end();
  });
});