<template>
  <label 
    class="group flex items-center p-4 px-6 my-3 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[#667eea] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  >
    <input type="checkbox" :checked="isChecked" @change="emit('update')" class="hidden" />
    <!-- We can put any element to this slot -->
    <span 
      class="w-[22px] h-[22px] border-2 rounded-md mr-4 relative transition-all duration-200 flex-shrink-0 flex items-center justify-center"
      :class="isChecked ? 'bg-[#667eea] border-[#667eea] after:content-[\'✓\'] after:text-white after:text-sm after:font-bold' : 'border-[#ddd] group-hover:border-[#667eea]'"
    ></span>
    <span 
      class="flex-1 text-left text-base transition-all duration-300 mr-4"
      :class="isChecked ? 'line-through text-[#a0aec0]' : 'text-[#2d3748]'"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  isChecked?: boolean | false
}>()

const emit = defineEmits(['update'])
</script>
