<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-8 antialiased text-center text-[#2c3e50] text-xl"
  >
    <AppHeader />
    <TodoList ref="todoListRef" />
  </div>
</template>
