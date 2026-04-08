# Coding Rules (Project Reference)

This document summarizes the rules used to build this Job Search Portal so the same standards can be reused in future projects.

## 1) Core Engineering Principles

- Keep it simple: prefer KISS over clever abstractions.
- Avoid duplication: apply DRY where duplication is real and repeated.
- Do not overbuild: apply YAGNI for features not currently needed.
- One responsibility per class/component (SRP).
- Keep behavior predictable (Principle of Least Surprise).
- Favor readability and maintainability over micro-optimizations.

## 2) Backend Rules (Spring Boot + MySQL + Elasticsearch + Redis)

- Use layered architecture:
  - `controller`: HTTP request/response only
  - `service` + `service/impl`: business logic only
  - `repository`: data access only
  - `dto`: request/response payloads only
  - `mapper`: entity/document <-> DTO mapping
  - `config`: Redis/Elasticsearch/Web/Jackson config
  - `exception`: centralized error handling
- Never put business logic in controllers.
- Never expose persistence entities directly in API responses.
- Prefer constructor injection; avoid field injection.
- Keep MySQL model and Elasticsearch document concerns separate.
- Use Redis through Spring Cache annotations for common read paths (simple, maintainable).
- Use `Pageable` internally and return a frontend-friendly page DTO:
  - `content`, `page`, `size`, `totalElements/totalItems`, `totalPages`, `hasNext`, `hasPrevious`, `loadTimeMs`
- Use Bean Validation for request DTOs.
- Keep APIs stable; if contract changes are required, document them clearly.

## 3) Frontend Rules (React + Axios)

- Keep clean structure:
  - `components`: UI-only pieces
  - `pages`: page-level orchestration/state
  - `services`: API access only
  - `utils/constants`: shared helpers and defaults
- Do not call Axios directly in components/pages; call service functions only.
- Use a single Axios client instance (`baseURL`, headers, timeout, normalized error handling).
- Use `useState` + `useEffect` for state/data flow (simple and beginner-friendly).
- Keep components small and focused; avoid monolithic pages.
- All forms must use explicit `<label>` fields.
- Job and application lists should render in table format.
- Use reusable pagination component for page navigation.
- Show user-friendly loading and error states.
- Add `PropTypes` for components receiving props.
- Prefer `globalThis` over `window` for global APIs.

## 4) Code Quality Rules

- Use meaningful names for variables, methods, and components.
- Keep methods short; extract helpers only when clarity improves.
- Remove dead code and empty directories.
- Avoid large `if/else` ladders and unnecessary `break/continue` complexity.
- Keep lint/build warnings at zero for touched files.

## 5) Delivery & Git Rules

- Refactor incrementally; do not rewrite the whole project unless required.
- Preserve user-facing behavior unless fixing a bug.
- Validate with build/test commands before finalizing changes.
- Commit scoped changes with clear commit messages.
- Do not mix unrelated backend/frontend changes in one commit when avoidable.

## 6) Quick Checklist (Before Merge)

- Controllers are thin.
- Services are readable and testable.
- DTOs are used correctly.
- API calls are centralized in frontend services.
- Pagination works end-to-end.
- Redis cache paths are simple and correct.
- Elasticsearch code is isolated and readable.
- Forms have labels and actions are clear.
- No unresolved imports/lint errors.
- Project builds successfully.

