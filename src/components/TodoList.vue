<template>
  <div class="todo-container">
    <ul class="todo-list">
      <li v-for="(item, index) in sortedList" :key="item.title + index">
        <ListItem :isChecked="item.checked">
          {{ item.title }}
        </ListItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ListItem from './ListItem.vue'
type Item = {
  title: string
  checked?: boolean
}
const listItems: Item[] = [
  { title: 'Make a todo list app', checked: true },
  { title: 'Predict the weather', checked: false },
  { title: 'Play some tunes', checked: false },
  { title: "Let's get cooking", checked: false },
  { title: 'Pump some iron', checked: false },
  { title: 'Track my expenses', checked: false },
  { title: 'Organize a game night', checked: false },
  { title: 'Learn a new language', checked: false },
  { title: 'Publish my work' },
]
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.todo-list {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
