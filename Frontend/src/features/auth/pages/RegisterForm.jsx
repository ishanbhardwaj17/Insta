import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import "../style/form.scss"

const RegisterForm = () => {
  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await handleRegister(userName, email, password)
      console.log("Registration successful")
      navigate('/')
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

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
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterForm