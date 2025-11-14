<template>
  <Transition name="modal">
    <div v-if="isEditing" class="modal-overlay" @click.self="handleCancel">
      <div class="modal-content">
        <h2 class="modal-title">Edit Todo</h2>
        <form @submit.prevent="handleSubmit">
          <input
            ref="inputRef"
            v-model="editText"
            type="text"
            placeholder="Update your todo..."
            class="edit-input"
            maxlength="100"
            @keydown.esc="handleCancel"
          />
          <div class="button-group">
            <button type="button" class="cancel-button" @click="handleCancel">Cancel</button>
            <button type="submit" class="save-button" :disabled="!isValidInput">
              <span class="check-icon">✓</span>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  isEditing: boolean
  currentText: string
}>()

const emit = defineEmits<{
  updateTodo: [newText: string]
  cancel: []
}>()

const editText = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const isValidInput = computed(() => {
  const trimmed = editText.value.trim()
  return trimmed.length > 0 && trimmed !== props.currentText
})

const handleSubmit = () => {
  if (isValidInput.value) {
    emit('updateTodo', editText.value.trim())
    editText.value = ''
  }
}

const handleCancel = () => {
  emit('cancel')
  editText.value = ''
}

// Watch for modal opening to focus and select input
watch(
  () => props.isEditing,
  (newVal) => {
    if (newVal) {
      editText.value = props.currentText
      nextTick(() => {
        inputRef.value?.focus()
        inputRef.value?.select()
      })
    }
  },
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: left;
}

.edit-input {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.edit-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.edit-input::placeholder {
  color: #a0aec0;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cancel-button:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.save-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.save-button:active:not(:disabled) {
  transform: translateY(0);
}

.save-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.check-icon {
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
}

/* Transition effects */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(20px);
}

@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;
  }

  .cancel-button,
  .save-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
