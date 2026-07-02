const db = require("../db");

function login(username, password, callback) {
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (row) callback({ role: row.role, username: row.username });
      else callback(null);
    },
  );
}

function register(username, password, callback) {
  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')`,
    [username, password],
    function (err) {
      if (err) callback({ error: "User already exists" });
      else callback({ username, role: "customer" });
    },
  );
}

module.exports = { login, register };
