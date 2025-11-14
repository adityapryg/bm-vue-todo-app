<template>
  <div class="min-h-screen">
    <div class="p-4 px-8 max-w-[600px] mx-auto">
      <router-link
        to="/dashboard"
        class="inline-block text-white no-underline font-medium py-2 px-4 bg-white/10 backdrop-blur-[10px] rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/20 hover:-translate-x-1"
      >
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
