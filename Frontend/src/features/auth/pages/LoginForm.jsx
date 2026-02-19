import React from 'react'
import { Link } from 'react-router-dom'
import "../style/form.scss"

const LoginForm = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form  >
          <input
            type="text"
            name='username'
            placeholder='Enter username' />

          <input
            type="password"
            name='password'
            placeholder='Enter password' />

          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default LoginForm