# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Baihu Animation (杭州白鹄动画有限公司) — official website for a Japanese-style 2D animation studio in Hangzhou. Static SPA targeting Japanese animation production companies. Live at https://baihu-animation.com

Tech: Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Vue Router (Hash mode), Sass/SCSS. No UI framework — all custom CSS.

## Commands

```bash
yarn dev          # Vite dev server (localhost:5173)
yarn build        # Type-check + Vite build (outputs to dist/)
yarn build-only   # Vite build only (skip type-check)
yarn type-check   # vue-tsc --build
yarn lint         # eslint . --fix
yarn format       # prettier --write src/
```

No test framework is configured. There are no tests to run.

## Architecture

### i18n — Custom, NOT vue-i18n

The project uses a **custom lightweight i18n solution** (`src/composables/useI18n.ts`), not vue-i18n. Do not import from `vue-i18n`. Translation keys use dot-notation lookup into nested locale objects (`src/locales/`). Four locales: zh-CN, zh-TW, en-US, ja-JP. The `$t()` API is injected as a Vue global property via `src/plugins/simple-i18n.ts`. Adding a new locale requires creating a file in `src/locales/` and registering it in the plugin.

### Composable Singletons

All composables (`useI18n`, `useTheme`, `useSeoMeta`, `useRouterPrefetch`) use a **module-level singleton pattern** — refs are declared at module scope, not inside the function. This shares state across components without Pinia. Pinia is installed but `src/stores/` is empty; prefer the composable singleton pattern for new shared state.

### Data Layer

All data is static TypeScript modules in `src/data/` — no API calls, no fetch. Works, news, and recruitment data live there. News/recruitment use i18n key references; actual text comes from locale files. Work images are hosted externally at `photos.baihu-animation.com`.

### Routing

Vue Router with Hash mode (`createWebHashHistory`). All views lazy-loaded. Each route carries `meta.seo` (title, description, ogImage). An `afterEach` hook in `src/router/index.ts` auto-applies SEO meta tags via `src/composables/useSeoMeta.ts`. Route prefetching (`src/composables/useRouterPrefetch.ts`) triggers on hover and viewport intersection.

### CSS

- Design tokens in `App.vue` `:root` / `[data-theme='dark']` / `[data-theme='light']` blocks
- Desktop-first responsive, `html` font-size `calc(100vw / 192)` based on 1920px design width
- 8px grid spacing system
- Theme: dark/light via `data-theme` attribute on `<html>`, managed by `src/composables/useTheme.ts`
- No external CSS framework, no component library

### SEO

Per-page meta tags + JSON-LD structured data, managed dynamically per route. Route-level SEO config lives in `src/router/index.ts` as `PAGE_SEO`.

## Code Conventions

- **Prettier**: no semicolons, single quotes, 100 char width
- **Indent**: 2 spaces, UTF-8, LF endings
- **Components**: PascalCase `.vue` files (e.g., `HeroSection.vue`)
- **Composables**: camelCase `use*.ts` (e.g., `useI18n.ts`)
- **Commit messages**: Conventional Commits
- **File headers**: JSDoc `@file` comments at the top of source files
- **Path alias**: `@` resolves to `src/` (configured in both vite.config.ts and tsconfig.app.json)

## Key Gotchas

- `vue-i18n` is **not** used despite what some docs may say — the custom solution replaced it. See `I18N_MIGRATION.md` for history.
- The README references tools (auto-import plugins, vue3-lazyload) that are no longer installed. The actual `package.json` is the source of truth.
- `tsconfig.app.json` excludes a possibly-removed `src/components/PhotoComponent.vue`.
- Build output is ~170KB uncompressed (~65KB gzip). The `vendor` and `libs` chunks are split manually in `vite.config.ts`.

## Behavioral Guidelines

(From RULES.md)
- **Think before coding**: state assumptions, surface tradeoffs, ask if unclear.
- **Simplicity first**: minimum code that solves the problem. No speculative abstractions.
- **Surgical changes**: touch only what's needed. Match existing style. Don't refactor unrelated code.
- **Goal-driven execution**: define verifiable success criteria before implementing.
