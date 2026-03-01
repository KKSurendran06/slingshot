# Slingshot

An agentic research system for the Indian stock market. Slingshot pairs a FastAPI backend (session orchestration, streaming, and schemas) with a Next.js frontend that renders real-time thought traces, rich reports, and macro/portfolio visualizations.

## Demo highlights

- Research flow with live thought log, citations, and a structured report view.
- Macro analyzer with causal chain visualization, company impact cards, and trade ideas.
- Portfolio view with holdings, sector allocation, stress tests, and summary insights.
- Streaming simulation to show the product experience without a wired backend.

## Architecture overview

- Backend: FastAPI app factory, async DB engine, Pydantic schemas, and WebSocket connection manager.
- Frontend: Next.js App Router with layout-separated landing vs. app routes, Zustand stores, and UI components for reports and thought logs.

## Repo structure

```
slingshot/
  README.md
  IMPLEMENTATION_PLAN.md
  docs/IMPLEMENTATION_PLAN.md
  backend/
    main.py
    api/
    agents/
    tools/
    models.py
    utils.py
    config.py
    .env.example
  frontend/
    src/
    package.json
```

## Quick start (demo)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` to explore the demo flows.

## Backend

### Requirements

- Python 3.11+

### Setup

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -e .
cp .env.example .env
python main.py
```

### Environment variables

See `backend/.env.example` for defaults. Key values:

- `DATABASE_URL`
- `DATABASE_SYNC_URL`
- `REDIS_URL`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `DEFAULT_LLM_PROVIDER`
- `CHROMA_PERSIST_DIR`
- `LOCAL_VAULT_URL`
- `NPU_ENABLED`

### API endpoints (current stubs)

- `POST /api/v1/research`
- `GET /api/v1/research/{session_id}`
- `GET /api/v1/research/{session_id}/report`
- `POST /api/v1/macro/analyze`
- `GET /api/v1/macro/{session_id}`
- `GET /api/v1/macro/{session_id}/chain`
- `POST /api/v1/portfolio`
- `GET /api/v1/portfolio/{id}`
- `POST /api/v1/portfolio/{id}/stress-test`
- `POST /api/v1/vault/process`
- `GET /health`

### WebSocket streaming

- Research: `ws://localhost:8000/ws/research/{session_id}`
- Macro: `ws://localhost:8000/ws/macro/{session_id}`

## Frontend

### Requirements

- Node.js 18+

### Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment variables

Create a `.env.local` with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## Demo mode

The frontend currently uses demo data and simulated streaming for Research, Macro, and Portfolio. The UI renders thought logs, reports, and visual widgets without a running backend, while the API client and WebSocket utilities are already wired for future integration.

## Tech stack (current)

- Frontend: Next.js (App Router), Tailwind CSS, Zustand, Framer Motion, Recharts, socket.io-client.
- Backend: FastAPI, SQLAlchemy (async), Pydantic, structlog.

## Notes

- The backend endpoints are placeholders and return stub responses until the LangGraph pipelines and data persistence are wired.
- Database migrations are not configured yet; tables are created at startup in dev mode.
