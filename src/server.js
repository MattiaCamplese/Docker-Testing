const http = require("http");
const os = require("os");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Ciao da Docker!",
      hostname: os.hostname(),
      node: process.version,
      time: new Date().toISOString(),
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

// Chiusura pulita quando Docker ferma il container
process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
