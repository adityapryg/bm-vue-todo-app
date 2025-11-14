<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="max-w-[800px] w-full">
      <h1 class="text-white text-4xl font-bold mb-12 text-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
        Welcome, {{ currentUser?.name }}! 👋
      </h1>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-12">
        <div
          class="bg-white/90 backdrop-blur-[10px] rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
        >
          <div class="text-5xl mb-4">📝</div>
          <div class="text-4xl font-bold text-[#667eea] mb-2">{{ stats.total }}</div>
          <div class="text-base text-[#4a5568] font-medium">Total Todos</div>
        </div>

        <div
          class="bg-white/90 backdrop-blur-[10px] rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
        >
          <div class="text-5xl mb-4">✓</div>
          <div class="text-4xl font-bold text-[#667eea] mb-2">{{ stats.completed }}</div>
          <div class="text-base text-[#4a5568] font-medium">Completed</div>
        </div>

        <div
          class="bg-white/90 backdrop-blur-[10px] rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
        >
          <div class="text-5xl mb-4">⏳</div>
          <div class="text-4xl font-bold text-[#667eea] mb-2">{{ stats.pending }}</div>
          <div class="text-base text-[#4a5568] font-medium">Pending</div>
        </div>
      </div>

      <div class="flex gap-4 justify-center flex-wrap">
        <router-link
          to="/tasks"
          class="py-4 px-8 rounded-xl text-base font-semibold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] no-underline inline-block bg-white text-[#667eea] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
        >
          View My Tasks
        </router-link>
        <button
          @click="handleLogout"
          class="py-4 px-8 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white/20 text-white border-2 border-white hover:bg-white/30 hover:-translate-y-0.5"
        >
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
