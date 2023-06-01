import React, { useState } from 'react'
import "./Login.css";
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <input type="text" placeholder="Username" className="login-input" onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder="Password" className="login-input" onChange={(e) => setPassword(e.target.value)} value={password} />

        <button type="submit" id="login-button" disabled={isLoading}>Log in</button>
        <p id="new-user-text">Don't have an account?</p>
        <a href="/register" id="register-link">Register</a>
      </form>
    </div>
  )
}

export default Login