<template>
  <div class="todo-container">
    <ul class="todo-list">
      <li v-for="(item, index) in sortedList" :key="item.title + index">
        <ListItem :isChecked="item.checked" @update="updateItem(item)">
          {{ item.title }}
        </ListItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ListItem from './ListItem.vue'
import { ref, Ref, computed } from 'vue'
type Item = {
  title: string
  checked?: boolean
}
const listItems: Ref<Item[]> = ref([
  { title: 'Make a todo list app', checked: true },
  { title: 'Predict the weather', checked: false },
  { title: 'Play some tunes', checked: false },
  { title: "Let's get cooking", checked: false },
  { title: 'Pump some iron', checked: false },
  { title: 'Track my expenses', checked: false },
  { title: 'Organize a game night', checked: false },
  { title: 'Learn a new language', checked: false },
  { title: 'Publish my work' },
])

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if (updatedItem) {
    toggleItemChecked(updatedItem)
  }
}
const findItemInList = (item: Item): Item | undefined => {
  return listItems.value.find((itemInList: Item) => itemInList.title === item.title)
}
const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}

const sortedList = computed(() =>
  [...listItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)),
)
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
