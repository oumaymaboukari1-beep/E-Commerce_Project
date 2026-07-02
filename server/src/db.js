server / src / db.js;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ecommerce.db");

// Création des tables si elles n'existent pas

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT UNIQUE,

    password TEXT,

    role TEXT

  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    price REAL,

    stock INTEGER

  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER,
  qty INTEGER,
  customer TEXT,
  date TEXT
)`);

  // Insérer admin si absent

  db.get(`SELECT * FROM users WHERE username = 'admin'`, (err, row) => {
    if (!row) {
      db.run(
        `INSERT INTO users (username, password, role) VALUES ('admin', 'admin', 'admin')`,
      );
    }
  });

  // Insérer quelques produits si absent

  db.get(`SELECT * FROM products`, (err, row) => {
    if (!row) {
      db.run(
        `INSERT INTO products (name, price, stock) VALUES ('Acer Nitro 16', 3699, 5)`,
      );

      db.run(
        `INSERT INTO products (name, price, stock) VALUES ('Dell Inspiron 15', 2299, 7)`,
      );
    }
  });
});

module.exports = db;
