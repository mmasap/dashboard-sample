import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashborad'
import SignIn from './SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
])

export default router
