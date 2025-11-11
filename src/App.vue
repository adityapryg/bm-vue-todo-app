<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

const todoListRef = ref<InstanceType<typeof TodoList>>()

const handleAddTodo = (title: string) => {
  todoListRef.value?.addNewTodo(title)
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-8 antialiased text-center text-[#2c3e50] text-xl"
  >
    <AppHeader />
    <TodoForm @addTodo="handleAddTodo" />
    <TodoList ref="todoListRef" />
  </div>
</template>
