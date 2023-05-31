import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Register.css"
import { useSignup } from '../../hooks/useSignup'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, password)
  }
  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input type="text" placeholder="Username" className="register-input" onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder="Password" className="register-input" onChange={(e) => setPassword(e.target.value)} value={password} />

        <button type="submit" id="register-button" disabled={isLoading}>Register</button>
        <p id="have-account-text">Already have account?</p>

        <a href="/login" id="login-link">Login</a>

      </form>
    </div>
  )
}

export default Register