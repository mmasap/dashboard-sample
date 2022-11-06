import React, { createContext, useContext, useState } from 'react'

type Auth = {
  username: string
}

type AuthContextType = {
  loading: boolean
  error: string
  auth: Auth | undefined
  signin: (email: string, password: string) => void
  signout: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState<Auth | undefined>()
  const [error, setError] = useState('')

  async function signin(email: string, password: string) {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error()
      const jsonResponse = await response.json()
      sessionStorage.setItem('auth', JSON.stringify(jsonResponse))
      setAuth(jsonResponse)
    } catch (e) {
      setError('ログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  async function signout() {
    setAuth(undefined)
  }

  const value = {
    auth,
    error,
    signin,
    signout,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
