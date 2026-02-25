import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'

const LoginForm = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await handleLogin(userName, password)
      console.log("Login successful")
      navigate('/')
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">Register</Link>
        </p>
      </div>
    </main>
  )
}

export default LoginForm