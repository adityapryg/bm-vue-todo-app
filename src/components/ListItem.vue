<template>
  <label :class="{ checked: isChecked }">
    <input type="checkbox" :checked="isChecked" @change="emit('update')" />
    <!-- We can put any element to this slot -->
    <span class="checkbox-custom"></span>
    <span class="todo-text">
      <slot></slot>
    </span>
    <button
      class="delete-btn"
      @click.prevent="emit('delete')"
      title="Delete todo"
      aria-label="Delete todo"
    >
      🗑️
    </button>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  isChecked?: boolean | false
}>()

const emit = defineEmits(['update', 'delete'])
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

.todo-text {
  flex: 1;
  text-align: left;
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-right: 1rem;
}

.checked .todo-text {
  text-decoration: line-through;
  color: #a0aec0;
}

.delete-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  opacity: 0;
}

label:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

.delete-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .delete-btn {
    opacity: 1;
  }
}
</style>
