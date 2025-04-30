const express = require("express");
const path = require("path");
const client = require("prom-client"); // <- метрики

const app = express();

// --- Метрики Prometheus ---
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // собираем базовые метрики Node.js

// Кастомная метрика — количество запросов к /api/ip
const ipRequestCounter = new client.Counter({
  name: "api_ip_requests_total",
  help: "Total number of requests to /api/ip"
});

// Регистрируем endpoint /metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
// ----------------------------

// Отдаём HTML-страничку
app.use(express.static(path.join(__dirname, "../public")));

// API для получения IP
app.get("/api/ip", (req, res) => {
  ipRequestCounter.inc(); // увеличиваем счётчик
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.json({ ip });
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server started http://localhost:3000");
});
