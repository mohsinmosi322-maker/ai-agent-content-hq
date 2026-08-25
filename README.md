# AI Agent Content HQ

Phase 1 foundation for an online AI operations platform. The repository is intentionally provider-independent and does not require a paid AI API.

## Phase 1 status
- Functional Node.js backend/API and browser dashboard
- Domain models for agents, tasks, workflows and activity events
- Manager, Researcher, Writer and Reviewer agent foundations
- Delegation/orchestration service with task lifecycle, failures and retry
- Provider-independent `AiGateway` / `AiProvider` abstraction
- Reviewer approval and revision decisions
- Real-time-ready activity event model; UI polls the API in Phase 1
- No secrets or API keys are stored in source

## Architecture
`Browser -> Frontend/dashboard -> HTTP API -> Orchestrator -> Agents -> AI Gateway -> Provider`

The current dashboard is served by the backend so the foundation can run as one small service during development. For production, the frontend can be deployed separately to GitHub Pages or another static host, while the backend, database and workers run on an online service.

## Core modules
- `backend/domain.js` — centralized enums and domain factories.
- `backend/agents.js` — agent abstractions and Phase 1 agents.
- `backend/ai.js` — provider-independent AI gateway and deterministic zero-cost development provider.
- `backend/orchestrator.js` — workflow/task execution and activity events.
- `backend/server.js` — dashboard and minimal API.
- `backend/orchestrator.test.js` — core orchestration tests.

## Run
Requires Node.js 20+.

```bash
npm test
npm start
```

Open `http://localhost:3000` in a browser.

## API foundation
- `GET /api/state` — agents, tasks, workflows and activity feed.
- `POST /api/workflows` with `{ "goal": "..." }` — creates a workflow.

## Security/deployment
Secrets must be supplied through environment variables or the deployment platform's secret manager. Never commit API keys. GitHub Pages cannot host the backend, database or workers; those components belong on an online backend/worker service.

## Coming in Phase 2
Persistent database/repositories, real authentication, streaming/SSE or WebSockets, dynamic manager planning/execution API, real research/search adapters, production AI provider adapters, scheduler, media pipeline, social OAuth/publishing and analytics.
