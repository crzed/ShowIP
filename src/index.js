const express = require("express");
const path = require("path");
const app = express();

// Отдаём HTML-страничку
app.use(express.static(path.join(__dirname, "../public")));

// API для получения IP
app.get("/api/ip", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.json({ ip });
});

app.listen(3000, () => {
  console.log("Server started http://localhost:3000");
});
