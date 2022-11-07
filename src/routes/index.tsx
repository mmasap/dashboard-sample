import {
  createBrowserRouter,
  useRouteError,
  isRouteErrorResponse,
  Navigate,
} from 'react-router-dom'
import DashboardLayout from './dashboard/layout'
import DashboardTop from './dashboard/top'
import DashboardUser from './dashboard/user'
import SignIn from './signin'

function RootBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Navigate to="/" />
    }

    if (error.status === 401) {
      return <Navigate to="/signin" />
    }
  }

  return <div>Something went wrong</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <RootBoundary />,
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
