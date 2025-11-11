<template>
  <div class="dashboard-view">
    <div class="dashboard-container">
      <h1 class="welcome-message">Welcome, {{ currentUser?.name }}! 👋</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">Total Todos</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✓</div>
          <div class="stat-value">{{ stats.completed }}</div>
          <div class="stat-label">Completed</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-value">{{ stats.pending }}</div>
          <div class="stat-label">Pending</div>
        </div>
      </div>

      <div class="actions">
        <router-link to="/tasks" class="action-btn primary">
          View My Tasks
        </router-link>
        <button @click="handleLogout" class="action-btn secondary">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import type { Item } from '@/types'

const router = useRouter()
const { currentUser, logout } = useAuth()

const stats = computed(() => {
  if (!currentUser.value) {
    return { total: 0, completed: 0, pending: 0 }
  }

  const storageKey = `list-items-${currentUser.value.id}`
  const stored = localStorage.getItem(storageKey)
  
  if (!stored) {
    return { total: 0, completed: 0, pending: 0 }
  }

  const items: Item[] = JSON.parse(stored)
  const completed = items.filter((item) => item.checked).length
  
  return {
    total: items.length,
    completed,
    pending: items.length - completed,
  }
})

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.dashboard-container {
  max-width: 800px;
  width: 100%;
}

.welcome-message {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-block;
}

.action-btn.primary {
  background: white;
  color: #667eea;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
