<template>
  <label :class="{ checked: isChecked }">
    <input type="checkbox" :checked="isChecked" @change="emit('update')" />
    <!-- We can put any element to this slot -->
    <span class="checkbox-custom"></span>
    <div class="todo-content">
      <span class="todo-text">
        <slot></slot>
      </span>
      <span v-if="description" class="todo-description">{{ description }}</span>
      <span v-if="dueDate" class="todo-due-date">📅 {{ formattedDueDate }}</span>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  isChecked?: boolean | false
  description?: string
  dueDate?: string
}>()

const emit = defineEmits(['update'])

const formattedDueDate = computed(() => {
  if (!props.dueDate) return ''
  const date = new Date(props.dueDate)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.75rem 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: #667eea;
  opacity: 0;
  transition: opacity 0.3s ease;
}

label:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

label:hover::before {
  opacity: 1;
}

input[type='checkbox'] {
  display: none;
}

.checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid #ddd;
  border-radius: 6px;
  margin-right: 1rem;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

label:hover .checkbox-custom {
  border-color: #667eea;
}

.checked .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}

.checked .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  margin-right: 1rem;
}

.todo-text {
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.todo-description {
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-top: 0.25rem;
}

.todo-due-date {
  color: #667eea;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.checked .todo-text {
  text-decoration: line-through;
  color: #a0aec0;
}

.checked .todo-description {
  text-decoration: line-through;
  color: #cbd5e0;
}

.checked .todo-due-date {
  text-decoration: line-through;
  color: #a0aec0;
}
</style>
