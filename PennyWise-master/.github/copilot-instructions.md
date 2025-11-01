  ## Frontend (React) — Starter guidance

  This repository is currently a fresh workspace. Below are concrete, discoverable patterns and an action plan to get a React + TypeScript frontend started quickly and consistently.

  Recommended stack
  - Vite + React + TypeScript (fast dev cycles). Use `react-router` for routing and React Query (or SWR) for data fetching.
  - CSS: CSS modules or Tailwind CSS. Use `.module.css` for component-scoped styles.

  Folder & file conventions (best practices for this project)
  - src/
    - pages/  — route-level components (PascalCase): `pages/Dashboard.tsx`, `pages/Expenses.tsx`
    - components/ — reusable UI components grouped by folder, component files in PascalCase: `components/ExpenseCard/ExpenseCard.tsx` and `components/ExpenseCard/index.ts` for re-export
    - features/ — domain-focused modules (state + components) e.g. `features/expenses/` with `ExpensesList.tsx`, `expenses.slice.ts`
    - services/ — API client and external integrations: `services/api.ts`, `services/auth.ts`
    - hooks/ — custom hooks in camelCase: `hooks/useAuth.ts`, `hooks/useExpenses.ts`
    - types/ — shared TypeScript types and interfaces: `types/index.ts` or `types/expense.ts`
    - store/ or context/ — app-wide state (only if using Redux or Context)
    - utils/ — small utilities in camelCase: `utils/formatCurrency.ts`
    - assets/ — static assets
    - styles/ — global styles / theme tokens

  Naming rules
  - React components and folders: PascalCase. File name == exported component name.
  - Hooks/utilities/services: camelCase.
  - Tests: colocate with components and name `Component.test.tsx` (Vitest/Jest).
  - CSS modules: `Component.module.css` and imported as `styles`.

  Architectural notes & integration points to document when code exists
  - API surface: centralize all HTTP calls in `src/services/api.ts` with typed responses. Use an `ApiError` shape for consistent error handling.
  - State and caching: prefer React Query for server state (caching, background refetching). Use feature folders for domain state that co-locates queries/mutations with UI.
  - Auth: token storage in HttpOnly cookies (recommended) or secure storage; document in `services/auth.ts` and any required env vars.

  Action plan (first sprint)
  1. Initialize project scaffold: create `frontend/` with Vite + React + TypeScript.
  2. Add base tooling: ESLint, Prettier, TypeScript strict settings, Husky + lint-staged hooks.
  3. Create top-level layout and routes (`pages/Dashboard`, `pages/Expenses`, `pages/AddExpense`).
  4. Implement basic components: `Header`, `Sidebar`, `ExpenseCard`, `ExpenseForm` and wire them to mock data.
  5. Implement `services/api.ts` with placeholder endpoints and types in `types/`.
  6. Integrate React Query and convert mock data to real fetches when backend exists.
  7. Add unit tests for core components and a GitHub Actions workflow for CI (lint, typecheck, test, build).

  Quick setup commands (developer machine — PowerShell)
  ```powershell
  # Create scaffold using Vite
  npm create vite@latest frontend -- --template react-ts
  cd frontend; npm install

  # Install recommended tooling (example)
  npm install -D eslint prettier eslint-config-prettier husky lint-staged vitest @testing-library/react
  ```

  Notes for AI agents working here
  - When the repo gains files, update this section with exact scripts from `package.json`, `tsconfig.json`, and any CI workflows under `.github/workflows/`.
  - Prefer making small, well-scoped PRs that add one feature or tooling change at a time and include a one-line rationale in the PR body.

  End of file.
