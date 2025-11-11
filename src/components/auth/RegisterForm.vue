<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2>Create Account</h2>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        placeholder="Enter your name"
        :disabled="loading"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        placeholder="Enter your email"
        :disabled="loading"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        minlength="8"
        placeholder="At least 8 characters"
        :disabled="loading"
      />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        v-model="formData.confirmPassword"
        type="password"
        required
        placeholder="Confirm your password"
        :disabled="loading"
      />
    </div>

    <button type="submit" class="submit-btn" :disabled="loading">
      {{ loading ? 'Creating account...' : 'Register' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''

  // Validate password length
  if (formData.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  // Validate password match
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    const result = register(
      formData.value.email,
      formData.value.password,
      formData.value.name,
    )
    
    if (result.success) {
      await router.push('/dashboard')
    } else {
      error.value = result.error || 'Registration failed'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 400px;
}

h2 {
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.error-message {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
