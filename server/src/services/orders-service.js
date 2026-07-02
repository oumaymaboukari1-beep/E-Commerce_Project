const db = require("../db");

function placeOrder(productId, qty, user, callback) {
  if (!user) return callback({ error: "User must be logged in" });

  db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, product) => {
    if (!product) return callback({ error: "Product not found" });
    if (product.stock < qty) return callback({ error: "Not enough stock" });

    db.run(`UPDATE products SET stock = stock - ? WHERE id = ?`, [
      qty,
      productId,
    ]);
    db.run(`INSERT INTO orders (productId, qty, customer) VALUES (?, ?, ?)`, [
      productId,
      qty,
      user.username,
    ]);

    callback({ success: true, product, qty, customer: user.username });
  });
}

module.exports = { placeOrder };
