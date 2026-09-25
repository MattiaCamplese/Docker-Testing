const http = require("http");
const os = require("os");

const PORT = process.env.PORT || 3000;

// Dati in memoria: si azzerano quando il container si riavvia
let nextId = 3;
let todos = [
  { id: 1, text: "Avviare i container con docker compose", done: true },
  { id: 2, text: "Collegare frontend e backend", done: false },
];

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(data === undefined ? undefined : JSON.stringify(data));
}

// Corpo delle richieste limitato: un todo non ha bisogno di più di qualche KB
const MAX_BODY = 16 * 1024;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY) {
        // Il resto del corpo viene scartato, così la risposta 413 arriva comunque al client
        req.removeAllListeners("data");
        req.removeAllListeners("end");
        req.resume();
        reject(new HttpError(413, "Richiesta troppo grande"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new HttpError(400, "JSON non valido"));
      }
    });
    req.on("error", reject);
  });
}

async function handle(req, res) {
  const { pathname } = new URL(req.url, "http://localhost");
  const todoMatch = pathname.match(/^\/api\/todos\/(\d+)$/);

  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET" && pathname === "/api/info") {
    return sendJson(res, 200, {
      message: "Ciao dal backend in Docker!",
      hostname: os.hostname(),
      node: process.version,
      uptime: Math.round(process.uptime()),
      time: new Date().toISOString(),
    });
  }

  if (req.method === "GET" && pathname === "/api/todos") {
    return sendJson(res, 200, todos);
  }

  if (req.method === "POST" && pathname === "/api/todos") {
    const { text } = await readJson(req);
    if (typeof text !== "string" || !text.trim()) {
      return sendJson(res, 400, { error: "Il campo 'text' è obbligatorio" });
    }
    const todo = { id: nextId++, text: text.trim(), done: false };
    todos.push(todo);
    return sendJson(res, 201, todo);
  }

  if (todoMatch) {
    const id = Number(todoMatch[1]);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return sendJson(res, 404, { error: "Todo non trovato" });

    if (req.method === "PATCH") {
      const { done } = await readJson(req);
      if (typeof done === "boolean") todo.done = done;
      return sendJson(res, 200, todo);
    }

    if (req.method === "DELETE") {
      todos = todos.filter((t) => t.id !== id);
      return sendJson(res, 204);
    }
  }

  sendJson(res, 404, { error: "Not found" });
}

const server = http.createServer((req, res) => {
  handle(req, res).catch((err) => {
    if (res.headersSent || res.destroyed) return;
    if (err instanceof HttpError) return sendJson(res, err.status, { error: err.message });
    console.error(err);
    sendJson(res, 500, { error: "Errore interno" });
  });
});

server.listen(PORT, () => {
  console.log(`API in ascolto sulla porta ${PORT}`);
});

// Chiusura pulita quando Docker ferma il container
process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
