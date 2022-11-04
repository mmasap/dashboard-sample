import React, { createContext, useContext, useState } from 'react'

type Auth = {
  username: string
}

type AuthContextType = {
  loading: boolean
  auth: Auth | undefined
  login: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState<Auth | undefined>()

  async function login(email: string, password: string) {
    setLoading(true)
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const jsonResponse = await response.json()
      sessionStorage.setItem('auth', JSON.stringify(jsonResponse))
      setAuth(jsonResponse)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    auth,
    login,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
