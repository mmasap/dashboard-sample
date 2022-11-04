import { createBrowserRouter } from 'react-router-dom'
import DashboardCommon from './dashboard/common'
import DashboardTop from './dashboard/top'
import DashboardUser from './dashboard/user'
import SignIn from './signout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardCommon />,
    children: [
      { index: true, element: <DashboardTop /> },
      { path: '/user', element: <DashboardUser /> },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
])

export default router
