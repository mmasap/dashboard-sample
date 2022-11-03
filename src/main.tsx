import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthContext from './contexts/AuthContext'
import router from './routes'

const prepare = async () => {
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    const { worker } = await import('./mocks/browser')
    worker.start()
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  )
})
