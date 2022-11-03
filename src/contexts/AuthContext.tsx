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
  const [auth, setAuth] = useState<Auth | undefined>()
  const [loading, setLoading] = useState(true)

  function login(email: string, password: string) {
    setLoading(true)
    setAuth({ username: 'test' })
    setLoading(false)
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
