<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col sm:flex-row gap-3 bg-white/90 backdrop-blur-[10px] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
    >
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        class="flex-1 py-3.5 px-5 border-2 border-[#e2e8f0] rounded-xl text-base bg-white text-[#2d3748] placeholder:text-[#a0aec0] focus:outline-none focus:border-[#667eea]"
        maxlength="100"
      />
      <button
        type="submit"
        class="flex items-center justify-center sm:justify-start gap-2 py-3.5 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none rounded-xl text-base font-semibold cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!newTodo.trim()"
      >
        <span class="text-xl font-bold leading-none">+</span>
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
