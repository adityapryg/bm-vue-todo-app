# Vue Todo App - Development Guide

## Architecture Overview

This is a Vue 3 + TypeScript single-page application (SPA) with client-side authentication and user-scoped todo lists.

### Tech Stack
- **Vue 3.5+** with Composition API (`<script setup>`)
- **TypeScript** with strict type checking
- **Vue Router 4** for navigation and route guards
- **Vite** for build tooling
- **LocalStorage** for data persistence (demo purposes)

### Application Structure

```
App.vue (router-view)
├── LoginView → LoginForm (guest route)
├── RegisterView → RegisterForm (guest route)
├── DashboardView (protected route)
└── TasksView (protected route)
    └── AppHeader + TodoList → ListItem
```

## Directory Structure

```
src/
├── main.ts                 # App entry point with router setup
├── App.vue                 # Root component with global styles
├── router/
│   └── index.ts           # Route configuration and navigation guards
├── views/                  # Page-level components
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── DashboardView.vue
│   └── TasksView.vue
├── components/
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   └── tasks/             # Todo management components
│       ├── AppHeader.vue
│       ├── TodoList.vue
│       └── ListItem.vue
├── composables/
│   └── useAuth.ts         # Authentication logic (reactive state)
└── types/
    └── index.ts           # Shared TypeScript types
```

## Authentication System

### Composable Pattern

The app uses a **singleton composable** (`useAuth`) for authentication state:

```typescript
const currentUser = ref<User | null>(null)  // Shared reactive state

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)
  
  return {
    currentUser,
    isAuthenticated,
    login(email, password) { /* ... */ },
    register(email, password, name) { /* ... */ },
    logout() { /* ... */ }
  }
}
```

### LocalStorage Keys

- `'users'` - Array of registered users with hashed passwords
- `'auth-user'` - Current authenticated user (without password)
- `'list-items-{userId}'` - User-scoped todo lists

### Security Notes

⚠️ **This is a demo implementation. DO NOT use in production!**

- Passwords are hashed with a simple client-side hash (NOT secure)
- User data stored in localStorage (NOT secure)
- No server-side validation or authentication
- No CSRF protection or rate limiting

For production, use:
- Proper backend authentication (JWT, OAuth)
- Secure password hashing (bcrypt, argon2)
- HttpOnly cookies for session tokens
- Server-side validation and authorization

## Router Configuration

### Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | Redirect | Any | Redirects to `/dashboard` if authenticated, `/login` otherwise |
| `/login` | LoginView | Guest only | User login form |
| `/register` | RegisterView | Guest only | User registration form |
| `/dashboard` | DashboardView | Auth required | User stats and navigation |
| `/tasks` | TasksView | Auth required | Todo list management |

### Navigation Guards

```typescript
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')  // Protect authenticated routes
  } else if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/dashboard')  // Redirect logged-in users from auth pages
  } else {
    next()
  }
})
```

## Component Patterns

### Composition API with TypeScript

All components use `<script setup lang="ts">` for type-safe composition:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types'

// Props with TypeScript
const props = defineProps<{
  userId: string
}>()

// Emits with TypeScript
const emit = defineEmits<{
  (e: 'logout'): void
}>()

// Reactive state
const user = ref<User | null>(null)
</script>
```

### State Management

- **Authentication**: Singleton composable with module-level reactive state
- **Todo Lists**: LocalStorage with user-scoped keys
- **No Vuex/Pinia**: Simple enough for Composition API only

### Props and Events

- Use `defineProps<{ ... }>()` for type-safe props
- Use `defineEmits<{ ... }>()` for type-safe events
- Use `@/` alias for imports from `src/`

## Code Style

### TypeScript
- No semicolons
- Single quotes for strings
- 100 character line width
- Inline type definitions (no separate interfaces unless reused)
- Use TypeScript generics for route typing

### Vue Components
- `<script setup lang="ts">` for all components
- Scoped styles in components
- Global styles only in `App.vue`
- Props and emits defined with TypeScript generics

### Styling
- **Purple gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Glassmorphism**: `backdrop-filter: blur(10px)` with semi-transparent backgrounds
- **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth animations
- **Font**: Poppins (via global styles)

## Data Flow

### Registration Flow
1. User submits RegisterForm
2. `useAuth().register()` validates and creates user
3. User saved to `localStorage.getItem('users')`
4. Auto-login: set `currentUser` and save to `localStorage.getItem('auth-user')`
5. Router navigates to `/dashboard`

### Login Flow
1. User submits LoginForm
2. `useAuth().login()` validates credentials
3. On success: set `currentUser` and save to `localStorage.getItem('auth-user')`
4. Router navigates to `/dashboard`

### Todo Operations
1. TodoList reads from `localStorage.getItem('list-items-{userId}')`
2. User checks/unchecks todo → updates local state
3. Changes saved to user-scoped localStorage key
4. Todos sorted: unchecked first, checked last

### Logout Flow
1. User clicks logout button
2. `useAuth().logout()` clears `currentUser`
3. Remove `localStorage.getItem('auth-user')`
4. Router navigates to `/login`

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript compiler
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run deploy       # Build and deploy to GitHub Pages
```

## Build Configuration

### Vite Config
- Base path: `/bm-vue-todo-app/` (GitHub Pages deployment)
- Path alias: `@/` → `src/`
- Vue DevTools enabled in development

### TypeScript
- Strict mode enabled
- Vue 3 types included
- Node 22 types for build scripts

## Testing the App

### Manual Testing Checklist

**Authentication Flow:**
- [ ] Access `/dashboard` without login → redirects to `/login`
- [ ] Login with invalid credentials → shows error
- [ ] Login with valid credentials → redirects to `/dashboard`
- [ ] Access `/login` while authenticated → redirects to `/dashboard`
- [ ] Register new user → auto-logs in and redirects to `/dashboard`
- [ ] Logout → clears session and redirects to `/login`
- [ ] Refresh page while logged in → maintains auth state

**Todo Functionality:**
- [ ] New user sees default todo list
- [ ] Check/uncheck todo → updates UI and persists
- [ ] Checked todos move to bottom (sorting)
- [ ] Dashboard stats reflect current user's todos
- [ ] Create second user → sees separate todo list
- [ ] Switch between users → todos remain isolated

**Router Behavior:**
- [ ] Direct URL access respects auth guards
- [ ] Browser back/forward works correctly
- [ ] Root `/` redirects based on auth status

## Common Patterns

### Adding a New Protected Route

1. Create view component in `src/views/`
2. Add route to `src/router/index.ts`:
```typescript
{
  path: '/new-route',
  component: NewView,
  meta: { requiresAuth: true }
}
```

### Adding a New Component

1. Create component file with `<script setup lang="ts">`
2. Import types from `@/types`
3. Use composables like `useAuth()` for shared state
4. Add scoped styles for component-specific CSS

### Accessing Current User

```typescript
import { useAuth } from '@/composables/useAuth'

const { currentUser, isAuthenticated } = useAuth()

// currentUser.value.id, currentUser.value.name, etc.
```

### User-Scoped Storage

```typescript
const userId = currentUser.value?.id
const storageKey = `list-items-${userId}`
localStorage.setItem(storageKey, JSON.stringify(data))
```

## Deployment

The app deploys to GitHub Pages at: `https://adityapryg.github.io/bm-vue-todo-app/`

**Deploy command:** `npm run deploy`

This builds the app with base path `/bm-vue-todo-app/` and pushes to `gh-pages` branch.

## Future Enhancements

- Backend API integration with proper authentication
- Password strength validation
- Email verification
- Forgot password flow
- Add/edit/delete todo functionality
- Todo categories or tags
- Dark mode toggle
- Mobile responsive improvements
- Unit and E2E tests
