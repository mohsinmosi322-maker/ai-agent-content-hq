# AI Agent Content HQ

Phase 1 foundation for an online AI operations platform. The repository is provider-independent and does not require a paid AI API.

## Phase 1 status
- Functional Node.js backend/API and browser dashboard
- Static GitHub Pages frontend
- Domain models for agents, tasks, workflows and activity events
- Manager, Researcher, Writer and Reviewer agent foundations
- Delegation/orchestration service with task lifecycle, failures and retry
- Provider-independent `AiGateway` / `AiProvider` abstraction
- Reviewer approval and revision decisions
- Real-time-ready activity event model
- No secrets or API keys stored in source

## Architecture
Development:
`Browser -> Node.js dashboard/API -> Orchestrator -> Agents -> AI Gateway -> Provider`

GitHub Pages deployment:
`Browser -> GitHub Pages frontend`

The GitHub Pages frontend is intentionally static. It does **not** pretend to run the Node.js backend. Backend, database, workers and future real-time connections will be hosted separately online in later phases.

## GitHub Pages
The repository includes `.github/workflows/deploy-pages.yml`. Every push to `main` (or a manual workflow run) publishes the contents of `frontend/` using GitHub Pages Actions.

The repository owner must enable **Settings → Pages → Source → GitHub Actions** once. GitHub documents this as the supported custom-workflow publishing flow. After the workflow succeeds, the project site will use the normal GitHub Pages project URL:

`https://mohsinmosi322-maker.github.io/ai-agent-content-hq/`

The first deployment can take a few minutes to become available.

## Core modules
- `frontend/index.html` — static Phase 1 AI operations dashboard for GitHub Pages.
- `backend/domain.js` — centralized enums and domain factories.
- `backend/agents.js` — agent abstractions and Phase 1 agents.
- `backend/ai.js` — provider-independent AI gateway and deterministic zero-cost development provider.
- `backend/orchestrator.js` — workflow/task execution and activity events.
- `backend/server.js` — local development dashboard and minimal API.
- `backend/orchestrator.test.js` — core orchestration tests.
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment.

## Local development
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
