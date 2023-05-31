import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { Link } from 'react-router-dom'
import { photoProfile } from '../../assets'
import { JournalDetails } from '../../components'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from 'axios'
import { useLogout } from '../../hooks/useLogout'

const Profile = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const [journals, setJournals] = useState([])

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/journal/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        setJournals(response.data.reverse())
      } catch (error) {
        alert(error)
      }
    }

    fetchJournals()
  }, [])

  const handleClick = () => {
    logout()
  }

  const handleDelete = async (journalId) => {
    if (!user) return

    try {
      await axios.delete(`http://localhost:8080/api/journal/${journalId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      window.location.reload();
    } catch (error) {
      alert('Failed to delete journal. Please try again.');
    }
  }

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="photo-profile">
          <label htmlFor="profile-picker">
            <img src={photoProfile} />
            <input type="file" name="profile-picker" id="profile-picker" hidden accept="image/jpeg, image/png, image/jpg" />
          </label>
        </div>
        <div className="user-info">
          <p>{user.username}</p>
          <p>pembaca/penulis</p>
        </div>
        <button onClick={handleClick}>
          Log out
        </button>
      </div>

      <div className="library">
        <h1 id="library-title">Library</h1>
        {journals.map((journal) => (
          <div key={journal._id}>
            <Link to={`/journal/${journal._id}`}>
              <JournalDetails journal={journal} />
            </Link>
            <button className="material-symbols-outlined" onClick={() => handleDelete(journal._id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile