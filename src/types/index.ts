export type User = {
  id: string
  email: string
  name: string
}

export type AuthState = {
  currentUser: User | null
  isAuthenticated: boolean
}

export type Item = {
  title: string
  checked?: boolean
}
