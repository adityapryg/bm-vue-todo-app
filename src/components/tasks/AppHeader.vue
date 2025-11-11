<template>
  <header class="app-header">
    <div class="header-content">
      <div>
        <h1>✨ Todo List</h1>
        <p class="greeting">Welcome, {{ userName }}</p>
      </div>
      <button @click="emit('logout')" class="logout-btn">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const { currentUser } = useAuth()
const userName = currentUser.value?.name || 'User'
</script>

<style scoped>
.app-header {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: white;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
}

.greeting {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
