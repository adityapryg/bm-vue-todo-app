<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <AppHeader />
  <TodoList />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:
    'Poppins',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

body {
  background: #f3f4f6;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.2rem;
}

ul {
  list-style: none;
}
</style>
