import { createBrowserRouter } from 'react-router-dom'

import LoginForm from './features/auth/pages/LoginForm'
import RegisterForm from './features/auth/pages/RegisterForm'
import Feed from './features/post/pages/Feed'

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path : '*',
    element : <h1>404 Not Found</h1>
  },
  {
    path : '/',
    element : <Feed />
  }
])

export default routes
