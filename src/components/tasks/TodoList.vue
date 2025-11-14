<template>
  <div class="bg-white/80 backdrop-blur-[10px] rounded-2xl p-6 max-w-[600px] mx-auto px-4">
    <TodoForm @addTodo="addNewTodo" />

    <ul>
      <li v-for="(item, index) in sortedList" :key="item.title + index">
        <TaskItem
          :isChecked="item.checked"
          @update="updateItem(item)"
          @edit="startEdit(item)"
          @delete="confirmDelete(item)"
        >
          {{ item.title }}
        </TaskItem>
      </li>
    </ul>
    <TodoEditForm
      :isEditing="isEditing"
      :currentText="editingItem?.title || ''"
      @updateTodo="editTodo"
      @cancel="cancelEdit"
    />
    <ConfirmModal
      :isOpen="showDeleteModal"
      :itemTitle="deletingItem?.title || ''"
      @confirm="deleteTodo"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import TaskItem from './TaskItem.vue'
import TodoEditForm from './TodoEditForm.vue'
import ConfirmModal from './ConfirmModal.vue'
import { ref, computed, onMounted, type Ref } from 'vue'
import TodoForm from './TodoForm.vue'
import type { Item } from '@/types'

const props = defineProps<{
  userId: string
}>()

const storageItems: Ref<Item[]> = ref([])
const isEditing = ref(false)
const editingItem = ref<Item | null>(null)
const showDeleteModal = ref(false)
const deletingItem = ref<Item | null>(null)

const getStorageKey = (): string => {
  return `list-items-${props.userId}`
}

const setToStorage = (items: Item[]): void => {
  localStorage.setItem(getStorageKey(), JSON.stringify(items))
}

const getFromStorage = (): Item[] | [] => {
  const stored = localStorage.getItem(getStorageKey())
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

const startEdit = (item: Item): void => {
  editingItem.value = item
  isEditing.value = true
}

const editTodo = (newTitle: string): void => {
  if (editingItem.value && newTitle.trim() && newTitle !== editingItem.value.title) {
    const item = findItemInList(editingItem.value)
    if (item) {
      item.title = newTitle.trim()
      setToStorage(storageItems.value)
    }
  }
  isEditing.value = false
  editingItem.value = null
}

const cancelEdit = (): void => {
  isEditing.value = false
  editingItem.value = null
}

const confirmDelete = (item: Item): void => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const deleteTodo = (): void => {
  if (deletingItem.value) {
    const index = storageItems.value.findIndex((item) => item.title === deletingItem.value!.title)
    if (index !== -1) {
      storageItems.value.splice(index, 1)
      setToStorage(storageItems.value)
    }
  }
  showDeleteModal.value = false
  deletingItem.value = null
}

const cancelDelete = (): void => {
  showDeleteModal.value = false
  deletingItem.value = null
}

const sortedList = computed(() =>
  [...storageItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)),
)

onMounted(() => {
  storageItems.value = getFromStorage()
  initListItems()
})
</script>
