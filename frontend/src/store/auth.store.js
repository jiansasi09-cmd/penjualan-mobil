import { defineStore } from 'pinia'
import * as authService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(payload) {
      const data = await authService.login(payload)
      this.token = data.token
      this.role = data.user.role
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      return data
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.token = null
      this.role = null
    }
  }
})
