import React from 'react'
import { Link } from 'react-router-dom'
import "../style/form.scss"

const RegisterForm = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form  >
          <input
            type="text"
            name='username'
            placeholder='Enter username' />

          <input
            type="email"
            name='email'
            placeholder='Enter email' />

          <input
            type="password"
            name='password'
            placeholder='Enter password' />

          <button type='submit'>Register</button>
        </form>
        <p> Already Have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default RegisterForm