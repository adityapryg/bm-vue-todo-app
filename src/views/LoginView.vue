<template>
  <div class="auth-view">
    <div class="auth-card">
      <LoginForm />
      <p class="switch-link">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.switch-link {
  margin-top: 1.5rem;
  color: white;
  font-size: 0.9rem;
}

.switch-link a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid white;
  transition: all 0.3s ease;
}

.switch-link a:hover {
  opacity: 0.8;
}
</style>
