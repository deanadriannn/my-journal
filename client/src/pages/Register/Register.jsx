import React, { useState } from 'react'
import "./Register.css"
import { useSignup } from '../../hooks/useSignup'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('pembaca')
  const { signup, isLoading } = useSignup()

  const handleClick = (radioValue) => {
    setRole(radioValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, password, role)
  }
  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input type="text" placeholder="Username" className="register-input" onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder="Password" className="register-input" onChange={(e) => setPassword(e.target.value)} value={password} />

        <div className="radio">
          <div>
            <input type="radio" id="pembaca" name="role" value="pembaca" onClick={() => handleClick("pembaca")} defaultChecked />
            <label htmlFor="pembaca">Pembaca</label>
          </div>
          <div>
            <input type="radio" id="penulis" name="role" value="penulis" onClick={() => handleClick("penulis")} />
            <label htmlFor="penulis">Penulis</label>
          </div>
        </div>

        <button type="submit" id="register-button" disabled={isLoading}>Register</button>
        <p id="have-account-text">Already have an account?</p>

        <a href="/login" id="login-link">Login</a>

      </form>
    </div>
  )
}

export default Register