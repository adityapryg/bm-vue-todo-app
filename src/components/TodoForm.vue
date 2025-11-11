<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="todo-form">
      <h2 class="form-title">Add New Todo</h2>
      
      <div class="form-group">
        <label for="title" class="form-label">
          Title <span class="required">*</span>
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          class="form-input"
          :class="{ 'input-error': errors.title }"
          placeholder="Enter todo title"
          @input="clearError('title')"
        />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          class="form-input form-textarea"
          placeholder="Enter todo description (optional)"
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          id="dueDate"
          v-model="formData.dueDate"
          type="date"
          class="form-input"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          Add Todo
        </button>
        <button type="button" class="btn btn-secondary" @click="resetForm">
          Clear
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

export type TodoFormData = {
  title: string
  description: string
  dueDate: string
}

const emit = defineEmits<{
  'create-todo': [data: TodoFormData]
}>()

const formData = reactive<TodoFormData>({
  title: '',
  description: '',
  dueDate: '',
})

const errors = reactive<{ title?: string }>({})

const clearError = (field: keyof typeof errors): void => {
  delete errors[field]
}

const validateForm = (): boolean => {
  let isValid = true

  if (!formData.title.trim()) {
    errors.title = 'Title is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = (): void => {
  if (validateForm()) {
    emit('create-todo', {
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate,
    })
    resetForm()
  }
}

const resetForm = (): void => {
  formData.title = ''
  formData.description = ''
  formData.dueDate = ''
  delete errors.title
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
}

.todo-form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.required {
  color: #e53e3e;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #2d3748;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:hover:not(:focus) {
  border-color: #cbd5e0;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.input-error {
  border-color: #e53e3e;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.error-message {
  display: block;
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.btn-secondary:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 640px) {
  .todo-form {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.25rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
