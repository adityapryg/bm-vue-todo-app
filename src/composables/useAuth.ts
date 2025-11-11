import { ref, computed } from 'vue'
import type { User, AuthState } from '@/types'

const currentUser = ref<User | null>(null)

// Initialize from localStorage
const initializeAuth = () => {
  const storedUser = localStorage.getItem('auth-user')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('auth-user')
    }
  }
}

// Initialize on first load
initializeAuth()

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)

  const authState = computed<AuthState>(() => ({
    currentUser: currentUser.value,
    isAuthenticated: isAuthenticated.value,
  }))

  // Simple hash function for demo purposes only
  // WARNING: This is NOT secure for production use!
  // In production, use proper backend authentication with bcrypt/argon2
  const simpleHash = (password: string): string => {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString(36)
  }

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const usersData = localStorage.getItem('users')
    const users: Array<User & { password: string }> = usersData ? JSON.parse(usersData) : []

    const hashedPassword = simpleHash(password)
    const user = users.find((u) => u.email === email && u.password === hashedPassword)

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user
      currentUser.value = userWithoutPassword
      localStorage.setItem('auth-user', JSON.stringify(userWithoutPassword))
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  const register = (
    email: string,
    password: string,
    name: string,
  ): { success: boolean; error?: string } => {
    const usersData = localStorage.getItem('users')
    const users: Array<User & { password: string }> = usersData ? JSON.parse(usersData) : []

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password: simpleHash(password),
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto-login after registration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser
    currentUser.value = userWithoutPassword
    localStorage.setItem('auth-user', JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = (): boolean => {
    currentUser.value = null
    localStorage.removeItem('auth-user')
    return true
  }

  return {
    authState,
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
