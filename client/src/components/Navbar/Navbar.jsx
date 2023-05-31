import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import { profile, search } from '../../assets'

const Navbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    onSearch(searchValue)
    navigate('/')
  };

  const resetSearchValue = () => {
    setSearchValue('')
    window.location.reload()
  }

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="home-logo">
          <Link to="/" onClick={resetSearchValue}>
            <h1>MyJournal</h1>
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="search" onChange={(e) => setSearchValue(e.target.value)} />
          <a href="#">
            <img src={search} onClick={handleSearch} />
          </a>
        </div>
        <div className="profile-logo">
          <Link to="/profile">
            <img src={profile} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar