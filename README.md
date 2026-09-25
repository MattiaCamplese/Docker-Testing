# Canon UI

Le regole di UI/UX (Material Design 3 e regole del progetto) raccolte in un'app di esempio, con due container:

| Servizio   | Cosa fa                                                    | Indirizzo sul PC      |
| ---------- | ---------------------------------------------------------- | --------------------- |
| `frontend` | React + Vite + shadcn/ui (Tailwind v4), server di sviluppo | http://localhost:3000 |
| `app`      | API Node.js senza dipendenze, todo in memoria              | http://localhost:3001 |

Il frontend inoltra le chiamate `/api/*` al servizio `app` attraverso il proxy di Vite, dentro la rete di Docker.

## Avvio

Serve solo **Docker Desktop**: Node non è necessario sul PC.

```sh
docker compose up --build      # prima volta, o dopo aver cambiato le dipendenze
docker compose up -d           # le volte successive, in background
docker compose logs -f         # log di entrambi i container
docker compose down            # ferma tutto
```

Il codice è montato nei container: le modifiche a `frontend/src` e `src` si vedono subito
(hot reload di Vite e riavvio di nodemon, entrambi in polling perché su Windows i bind mount non propagano gli eventi).
Il frontend parte solo quando l'API risponde su `/api/health`.

## Controlli sul frontend

```sh
docker compose exec frontend npx tsc -b              # tipi
docker compose exec frontend npx eslint src          # lint, compresa la regola degli 8px
docker compose exec frontend npx prettier --write src
docker compose exec frontend npx vite build --outDir /tmp/dist --emptyOutDir   # prova di build
```

Per avere i tipi in VS Code serve anche una copia di `node_modules` sul PC:

```powershell
docker run --rm -v "${PWD}\frontend:/app" -w /app node:22-alpine npm ci
```

## API

| Metodo   | Percorso         | Descrizione                                      |
| -------- | ---------------- | ------------------------------------------------ |
| `GET`    | `/api/health`    | Stato del servizio (usato dall'healthcheck)      |
| `GET`    | `/api/info`      | Hostname del container, versione di Node, uptime |
| `GET`    | `/api/todos`     | Elenco dei todo                                  |
| `POST`   | `/api/todos`     | Crea un todo: `{ "text": "..." }`                |
| `PATCH`  | `/api/todos/:id` | Aggiorna: `{ "done": true }`                     |
| `DELETE` | `/api/todos/:id` | Elimina                                          |

I todo stanno in memoria e si azzerano al riavvio del container. Il corpo delle richieste è limitato a 16 KB.

## Immagine di produzione del backend

Il `Dockerfile` ha due stadi: `dev` (usato da compose, con nodemon) e `prod` (solo dipendenze di produzione, utente non root).

```sh
docker build --target prod -t docker-testing-api .
docker run --rm -p 3001:3000 docker-testing-api
```
