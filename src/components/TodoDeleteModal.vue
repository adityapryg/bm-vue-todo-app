<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <Transition name="modal-slide">
        <div v-if="isOpen" class="modal-dialog" @click.stop>
          <div class="modal-icon">🗑️</div>
          <h2 class="modal-title">Delete Todo?</h2>
          <p class="modal-message">
            Are you sure you want to delete: <strong>"{{ todoTitle }}"</strong>
          </p>
          <p class="modal-subtext">This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="emit('cancel')">Cancel</button>
            <button class="btn-delete" @click="emit('confirm')">
              <span class="icon">🗑️</span>
              Delete
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  todoTitle: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleOverlayClick = () => {
  emit('cancel')
}

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('cancel')
  }
}

// Add/remove ESC key listener based on modal open state
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    } else {
      document.removeEventListener('keydown', handleEscKey)
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

.modal-dialog {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 700;
}

.modal-message {
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.modal-message strong {
  color: #2d3748;
  word-break: break-word;
}

.modal-subtext {
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-cancel,
.btn-delete {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-cancel {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-cancel:hover {
  background: #cbd5e0;
  transform: translateY(-1px);
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-delete .icon {
  font-size: 1rem;
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .modal-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-delete {
    width: 100%;
  }
}
</style>
