import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '~/contexts/AuthContext'

export default function authRoot() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth?.username) {
      navigate('/signin')
    }
  }, [])

  return <Outlet />
}
