# Vue 3 Todo List - Copilot Instructions

## Architecture

Single-page Vue 3 app with component hierarchy: `App.vue` → `AppHeader.vue` + `TodoList.vue` → `ListItem.vue`. State management lives entirely in `TodoList.vue` using Composition API with localStorage persistence—no Vuex/Pinia.

**Data Flow**: `ListItem` emits `'update'` → `TodoList.updateItem()` toggles `checked` → `setToStorage()` persists → `sortedList` computed re-renders with unchecked items first.

## Key Patterns

### State Management in TodoList.vue

- `storageItems` ref is single source of truth, synced to `localStorage` key `'list-items'`
- Every mutation calls `setToStorage(storageItems.value)` immediately after changes
- `sortedList` computed property auto-sorts: unchecked items first via `(a.checked ? 1 : 0) - (b.checked ? 1 : 0)`
- `initListItems()` seeds storage with default todos if empty (called once on mount)

### Component Communication

- Use `<script setup lang="ts">` with TypeScript generics for props/emits:
  ```typescript
  defineProps<{ isChecked?: boolean }>()
  defineEmits<{ (e: 'update'): void }>()
  ```
- `ListItem.vue` uses default `<slot>` for flexible content injection
- Child-to-parent updates via typed emits: `@change="emit('update')"` in checkbox → parent's `@update="updateItem(item)"`
- Props use optional syntax (`isChecked?: boolean`) with default values in template logic

### Type Definitions

Define types inline within components (not separate `.d.ts` files):

```typescript
type Item = { title: string; checked?: boolean }
```

## Styling System

### Tailwind CSS v4 + Inline Styles

- **Setup**: Tailwind v4 imported via `@import "tailwindcss"` in `style.css` (not `@tailwind` directives)
- **Pattern**: Long inline class strings with conditional classes via `:class` binding
- **Example from ListItem.vue**:
  ```vue
  <span :class="isChecked ? 'line-through text-[#a0aec0]' : 'text-[#2d3748]'"></span>
  ```
- **No Scoped Styles**: Components use `<template>` with Tailwind classes only—no `<style scoped>` sections
- **Global Styles**: Only in `App.vue` template and `style.css` `@layer base` for resets

### Design Tokens

- **Colors**: Purple gradient `#667eea` → `#764ba2`, white overlays with `bg-white/80`
- **Glassmorphism**: `backdrop-blur-[10px]` + semi-transparent backgrounds
- **Shadows**: `shadow-[0_8px_32px_rgba(0,0,0,0.1)]` for depth
- **Animations**: `transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]` for smooth interactions
- **Hover Effects**: `hover:-translate-y-0.5` + shadow increases, `before:` pseudo-elements for accent bars

## Development Commands

```bash
npm run dev          # Vite dev server with HMR on http://localhost:5173
npm run build        # Type-check via vue-tsc THEN production build (both must pass)
npm run type-check   # Run vue-tsc --build (required before merging)
npm run lint         # ESLint with --fix and --cache enabled
npm run format       # Prettier on src/ directory
npm run deploy       # Build + gh-pages deploy to /bm-vue-todo-app/
```

**Pre-merge Checklist**: Run `npm run type-check` and `npm run lint` before committing.

## Configuration

- **Path Alias**: `@/` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`)
- **Prettier**: No semicolons, single quotes, 100 char line width (`.prettierrc.json`)
- **ESLint**: Flat config (`eslint.config.ts`) with Vue 3 + TypeScript presets, ignores `dist/`, `coverage/`
- **Vite Base Path**: `/bm-vue-todo-app/` for GitHub Pages deployment
- **TypeScript**: Composite project with `tsconfig.json` referencing `tsconfig.app.json` + `tsconfig.node.json`
- **Node.js**: Requires `^20.19.0 || >=22.12.0` (see `package.json` engines field)
- **EditorConfig**: 2-space indents, LF line endings, 100 char max line length

## Common Tasks

### Adding a New Todo Item

Currently requires manual localStorage manipulation. To add programmatically:

1. Get current items: `const items = JSON.parse(localStorage.getItem('list-items') || '[]')`
2. Push new item: `items.push({ title: 'New todo', checked: false })`
3. Save: `localStorage.setItem('list-items', JSON.stringify(items))`
4. Reload page or trigger `storageItems.value = getFromStorage()` in TodoList

### Modifying Sort Order

Edit `sortedList` computed in `TodoList.vue`. Current logic: `(a.checked ? 1 : 0) - (b.checked ? 1 : 0)` puts unchecked first.

### Debugging localStorage

Open DevTools → Application → Local Storage → `http://localhost:5173` → key `list-items` to inspect/edit JSON directly.
