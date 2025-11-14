<template>
  <div class="todo-container">
    <ul class="todo-list">
      <li v-for="item in sortedList" :key="item.id">
        <ListItem :isChecked="item.checked" @update="updateItem(item)" @delete="startDelete(item)">
          {{ item.title }}
        </ListItem>
      </li>
    </ul>
    <TodoDeleteModal
      :isOpen="isDeleteModalOpen"
      :todoTitle="deletingItem?.title || ''"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import ListItem from './ListItem.vue'
import TodoDeleteModal from './TodoDeleteModal.vue'
import { ref, computed, onMounted, type Ref } from 'vue'

type Item = {
  id: string
  title: string
  checked?: boolean
}

const storageItems: Ref<Item[]> = ref([])
const isDeleteModalOpen = ref(false)
const deletingItem = ref<Item | null>(null)

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

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const initListItems = (): void => {
  if (storageItems.value?.length === 0) {
    const listItems: Item[] = [
      { id: generateId(), title: 'Make a todo list app', checked: true },
      { id: generateId(), title: 'Predict the weather', checked: false },
      { id: generateId(), title: 'Read some comics', checked: false },
      { id: generateId(), title: "Let's get cooking", checked: false },
      { id: generateId(), title: 'Pump some iron', checked: false },
      { id: generateId(), title: 'Track my expenses', checked: false },
      { id: generateId(), title: 'Organise a game night', checked: false },
      { id: generateId(), title: 'Learn a new language', checked: false },
      { id: generateId(), title: 'Publish my work', checked: false },
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
  return storageItems.value.find((itemInList: Item) => itemInList.id === item.id)
}

const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}

const addNewTodo = (title: string): void => {
  const newItem: Item = {
    id: generateId(),
    title,
    checked: false
  }
  storageItems.value.unshift(newItem)
  setToStorage(storageItems.value)
}

const sortedList = computed(() =>
  [...storageItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)),
)

const startDelete = (item: Item): void => {
  deletingItem.value = item
  isDeleteModalOpen.value = true
}

const confirmDelete = (): void => {
  if (deletingItem.value) {
    const index = storageItems.value.findIndex(
      (item) => item.id === deletingItem.value!.id,
    )
    if (index !== -1) {
      storageItems.value.splice(index, 1)
      setToStorage(storageItems.value)
    }
  }
  isDeleteModalOpen.value = false
  deletingItem.value = null
}

const cancelDelete = (): void => {
  isDeleteModalOpen.value = false
  deletingItem.value = null
}

onMounted(() => {
  storageItems.value = getFromStorage()
  initListItems()
})

defineExpose({
  addNewTodo
})
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
