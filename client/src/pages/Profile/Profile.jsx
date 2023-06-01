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
  const [favoriteJournals, setFavoriteJournals] = useState([])

  useEffect(() => {
    const fetchJournals = async () => {
      let response
      try {
        if (user.role === 'penulis') {
          response = await axios.get('http://localhost:8080/api/journal/profile', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          setJournals(response.data.reverse())
        }
        else if (user.role === 'pembaca') {
          const storedFavoriteJournals = JSON.parse(localStorage.getItem(`favoriteJournals_${user.username}`));
          if (storedFavoriteJournals) {
            setFavoriteJournals(storedFavoriteJournals);
            setJournals(storedFavoriteJournals);
          } else {
            setFavoriteJournals([]);
            setJournals([]);
          }

        }
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
      const updatedJournals = journals.filter(journal => journal._id !== journalId);
      setJournals(updatedJournals);
    } catch (error) {
      alert('Failed to delete journal. Please try again.');
    }
  }

  const handleRemoveFavorite = (journalId) => {
    // Menghapus jurnal dari daftar favoriteJournals
    const updatedFavoriteJournals = favoriteJournals.filter(journal => journal._id !== journalId);
    setFavoriteJournals(updatedFavoriteJournals);

    // Mengupdate localStorage favoriteJournals
    localStorage.setItem(`favoriteJournals_${user.username}`, JSON.stringify(updatedFavoriteJournals));
    window.location.reload();
  }

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="photo-profile">
          <img src={photoProfile} />
        </div>
        <div className="user-info">
          <p>{user.username}</p>
          <p>{user.role}</p>
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
            {user.role === 'penulis' ? (
              <button className="material-symbols-outlined" onClick={() => handleDelete(journal._id)}>
                delete
              </button>
            ) : (
              <button className="material-symbols-outlined" onClick={() => handleRemoveFavorite(journal._id)}>
                delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile