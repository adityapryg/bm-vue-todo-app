<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'
import type { TodoFormData } from './components/TodoForm.vue'

const todoListRef = ref<InstanceType<typeof TodoList> | null>(null)
const showForm = ref(false)

const toggleForm = (): void => {
  showForm.value = !showForm.value
}

const handleCreateTodo = (data: TodoFormData): void => {
  if (todoListRef.value) {
    todoListRef.value.addTodo({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      checked: false,
    })
    showForm.value = false
  }
}
</script>

<template>
  <AppHeader />
  <div class="add-todo-section">
    <button @click="toggleForm" class="toggle-form-btn">
      {{ showForm ? '✕ Close Form' : '+ Add Todo' }}
    </button>
  </div>
  <Transition name="slide-fade">
    <TodoForm v-if="showForm" @create-todo="handleCreateTodo" />
  </Transition>
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

.add-todo-section {
  max-width: 600px;
  margin: 0 auto 1.5rem;
  padding: 0 1rem;
  text-align: center;
}

.toggle-form-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: inherit;
}

.toggle-form-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: white;
}

.toggle-form-btn:active {
  transform: translateY(0);
}

/* Transition animations */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
