'use client'

// ── Global auth state ───────────────────────────────────────────────────
// Wraps the app (see layout.tsx). Hydrates the signed-in user from
// localStorage on mount, exposes login/register/logout, and keeps the
// cached user fresh from /users/me.

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api, tokenStore, type RegisterPayload } from '@/lib/api'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (payload: RegisterPayload) => Promise<User>
  logout: () => void
  refresh: () => Promise<void>
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Hydrate from cache, then verify against the server.
  useEffect(() => {
    const cached = tokenStore.getUser()
    if (cached) setUserState(cached)

    if (tokenStore.get()) {
      api
        .me()
        .then((fresh) => {
          setUserState(fresh)
          tokenStore.setUser(fresh)
        })
        .catch(() => {
          // token expired / invalid — sign out silently
          tokenStore.clear()
          setUserState(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password)
    tokenStore.set(res.access_token, res.refresh_token, res.user)
    setUserState(res.user)
    return res.user
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await api.register(payload)
    tokenStore.set(res.access_token, res.refresh_token, res.user)
    setUserState(res.user)
    return res.user
  }, [])

  const logout = useCallback(() => {
    tokenStore.clear()
    setUserState(null)
  }, [])

  const refresh = useCallback(async () => {
    if (!tokenStore.get()) return
    const fresh = await api.me()
    setUserState(fresh)
    tokenStore.setUser(fresh)
  }, [])

  const setUser = useCallback((u: User) => {
    setUserState(u)
    tokenStore.setUser(u)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
