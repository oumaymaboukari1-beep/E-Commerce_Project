const express = require("express");
const bodyParser = require("body-parser");
const { login, register } = require("./services/auth-service");
const { listProducts } = require("./services/catalog-service");
const { placeOrder } = require("./services/orders-service");
const { askLLM } = require("./services/llm-service");

const app = express();
app.use(bodyParser.json());

// Auth
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  login(username, password, (user) => {
    if (user) res.json(user);
    else res.status(401).json({ error: "Invalid credentials" });
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  register(username, password, (user) => {
    if (user.error) res.status(400).json(user);
    else res.json(user);
  });
});

// Catalogue
app.get("/products", (req, res) => {
  listProducts((products) => res.json(products));
});

// Commandes
app.post("/order", (req, res) => {
  const { productId, qty, user } = req.body;
  placeOrder(productId, qty, user, (result) => {
    if (result.error) res.status(400).json(result);
    else res.json(result);
  });
});

// Chatbot LLM
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const reply = await askLLM(message);
  res.json({ reply });
});

app.listen(3001, () =>
  console.log("Server with SQLite + LLM running on port 3001"),
);
