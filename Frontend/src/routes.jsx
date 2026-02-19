import { createBrowserRouter } from 'react-router-dom'

import LoginForm from './features/auth/pages/LoginForm'
import RegisterForm from './features/auth/pages/RegisterForm'

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
])

export default routes
