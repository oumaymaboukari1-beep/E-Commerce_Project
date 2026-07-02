const db = require("../db");

function listProducts(callback) {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    callback(rows);
  });
}

module.exports = { listProducts };
