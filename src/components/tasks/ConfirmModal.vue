<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="emit('cancel')"
    >
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div
          v-if="isOpen"
          class="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-md w-full p-6"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl"
            >
              ⚠️
            </div>
          </div>

          <!-- Title -->
          <h2 class="text-2xl font-bold text-[#2d3748] text-center mb-2">Delete Todo?</h2>

          <!-- Message -->
          <p class="text-[#718096] text-center mb-6">
            Are you sure you want to delete "<span class="font-semibold text-[#2d3748]">{{
              itemTitle
            }}</span
            >"? This action cannot be undone.
          </p>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              @click="emit('cancel')"
              class="flex-1 py-3 px-4 bg-gray-100 text-[#4a5568] rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              @click="emit('confirm')"
              class="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean
  itemTitle: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
