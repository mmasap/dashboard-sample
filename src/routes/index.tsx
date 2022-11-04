import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashborad'
import AuthRoot from './AuthRoot'
import SignIn from './SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoot />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
])

export default router
