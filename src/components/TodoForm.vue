<template>
  <div class="todo-form-container">
    <form @submit.prevent="handleSubmit" class="todo-form">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        class="todo-input"
        maxlength="100"
      />
      <button type="submit" class="add-button" :disabled="!newTodo.trim()">
        <span class="plus-icon">+</span>
        Add
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const newTodo = ref('')

const emit = defineEmits<{  
  (e: 'addTodo', title: string): void
}>()

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    emit('addTodo', newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<style scoped>
.todo-form-container {
  max-width: 600px;
  margin: 0 auto 1rem;
  padding: 0 1rem;
}

.todo-form {
  display: flex;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.todo-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #2d3748;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.todo-input::placeholder {
  color: #a0aec0;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-button:active:not(:disabled) {
  transform: translateY(0);
}

.add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.plus-icon {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
}

@media (max-width: 640px) {
  .todo-form {
    flex-direction: column;
  }

  .add-button {
    justify-content: center;
  }
}
</style>
