<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'
import type { TodoFormData } from './components/TodoForm.vue'

const todoListRef = ref<InstanceType<typeof TodoList> | null>(null)

const handleCreateTodo = (data: TodoFormData): void => {
  if (todoListRef.value) {
    todoListRef.value.addTodo({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      checked: false,
    })
  }
}
</script>

<template>
  <AppHeader />
  <TodoForm @create-todo="handleCreateTodo" />
  <TodoList ref="todoListRef" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:
    'Poppins',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

body {
  background: #f3f4f6;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.2rem;
}

ul {
  list-style: none;
}
</style>
