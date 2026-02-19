import React from 'react'
import { Link } from 'react-router-dom'
import "../style/form.scss"
import { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/register", {
      username: userName,
      email: email,
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='username'
            placeholder='Enter username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)} />

          <input
            type="email"
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input
            type="password"
            name='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button type='submit'>Register</button>
        </form>
        <p> Already Have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default RegisterForm