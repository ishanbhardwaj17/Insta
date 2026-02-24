import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../style/form.scss"
import axios from 'axios'
import { useAuth } from '../hooks/useAuth';


const LoginForm = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();

    handleLogin(userName, password).then(() => {
      console.log("Login successful");
    }).catch((error) => {
      console.error("Login failed:", error);
    });

  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='username'
            placeholder='Enter username'
            value={userName}
            onChange={(e) => setuserName(e.target.value)} />

          <input
            type="password"
            name='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default LoginForm