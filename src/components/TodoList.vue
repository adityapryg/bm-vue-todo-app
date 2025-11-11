<template>
  <div class="max-w-[600px] my-8 mx-auto px-4">
    <ul
      class="bg-white/80 backdrop-blur-[10px] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
    >
      <li v-for="(item, index) in sortedList" :key="item.title + index">
        <TaskItem :isChecked="item.checked" @update="updateItem(item)">
          {{ item.title }}
        </TaskItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TaskItem from './TaskItem.vue'
import { ref, computed, onMounted, type Ref } from 'vue'

type Item = {
  title: string
  checked?: boolean
}

const storageItems: Ref<Item[]> = ref([])

const setToStorage = (items: Item[]): void => {
  localStorage.setItem('list-items', JSON.stringify(items))
}

const getFromStorage = (): Item[] | [] => {
  const stored = localStorage.getItem('list-items')
  if (stored) {
    return JSON.parse(stored)
  }
  return []
}

const initListItems = (): void => {
  if (storageItems.value?.length === 0) {
    const listItems: Item[] = [
      { title: 'Make a todo list app', checked: true },
      { title: 'Predict the weather', checked: false },
      { title: 'Read some comics', checked: false },
      { title: "Let's get cooking", checked: false },
      { title: 'Pump some iron', checked: false },
      { title: 'Track my expenses', checked: false },
      { title: 'Organise a game night', checked: false },
      { title: 'Learn a new language', checked: false },
      { title: 'Publish my work', checked: false },
    ]
    setToStorage(listItems)
    storageItems.value = listItems
  }
}

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if (updatedItem) {
    toggleItemChecked(updatedItem)
    setToStorage(storageItems.value)
  }
}

const findItemInList = (item: Item): Item | undefined => {
  return storageItems.value.find((itemInList: Item) => itemInList.title === item.title)
}

const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}

const addNewTodo = (title: string): void => {
  const newItem: Item = {
    title,
    checked: false,
  }
  storageItems.value.unshift(newItem)
  setToStorage(storageItems.value)
}

const sortedList = computed(() =>
  [...storageItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)),
)

onMounted(() => {
  storageItems.value = getFromStorage()
  initListItems()
})

defineExpose({
  addNewTodo,
})
</script>
