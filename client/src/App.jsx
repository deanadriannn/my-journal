import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components'
import { Home, Login, Form, Profile, Journal, Register } from './pages'
import { useAuthContext } from './hooks/useAuthContext'

const App = () => {
  const { user } = useAuthContext()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <BrowserRouter>
      <header>
        <Navbar onSearch={handleSearch} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={user ? <Home searchValue={searchValue} /> : <Navigate to="/login" />}
          />
          <Route
            path="/form"
            element={user ? <Form /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/journal/:id"
            element={user ? <Journal /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App