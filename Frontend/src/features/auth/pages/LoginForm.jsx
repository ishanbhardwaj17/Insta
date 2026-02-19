import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../style/form.scss"
import axios from 'axios'

const LoginForm = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login", {
      username: userName,
      password: password
    }, {
      withCredentials: true
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
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