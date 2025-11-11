<template>
  <div class="tasks-view">
    <div class="back-nav">
      <router-link to="/dashboard" class="back-btn">
        ← Back to Dashboard
      </router-link>
    </div>
    <AppHeader @logout="handleLogout" />
    <TodoList v-if="currentUser" :userId="currentUser.id" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AppHeader from '@/components/tasks/AppHeader.vue'
import TodoList from '@/components/tasks/TodoList.vue'

const router = useRouter()
const { currentUser, logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.tasks-view {
  min-height: 100vh;
}

.back-nav {
  padding: 1rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.back-btn {
  display: inline-block;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-4px);
}
</style>
