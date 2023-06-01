import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Home.css"
import { JournalDetails } from '../../components'
import { plusIcon, premium } from '../../assets'
import { useAuthContext } from '../../hooks/useAuthContext'

const Home = ({ searchValue }) => {
  const { user } = useAuthContext()
  const [journals, setJournals] = useState([])
  const [searchedJournals, setSearchedJournals] = useState([])
  const [favoriteJournals, setFavoriteJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      let response
      try {
        if (user.isPremium) {
          response = await axios.get('http://localhost:8080/api/journal', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        } else {
          response = await axios.get('http://localhost:8080/api/journal/standard', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        }

        setJournals(response.data.reverse())
      } catch (error) {
        alert(error)
      }
    }

    fetchJournals()
  }, [])

  useEffect(() => {
    if (searchValue !== '') {
      setSearchedJournals(journals.filter((journal) => journal.title.toLowerCase().includes(searchValue.toLowerCase()) || journal.author.toLowerCase().includes(searchValue.toLowerCase())))
    } else {
      setSearchedJournals(journals)
    }
  }, [searchValue, journals])

  useEffect(() => {
    const storedFavoriteJournals = JSON.parse(localStorage.getItem(`favoriteJournals_${user.username}`));
    if (storedFavoriteJournals) {
      setFavoriteJournals(storedFavoriteJournals);
    }
  }, []);

  const handleFavorite = (journalId) => {
    const favoriteJournal = journals.find((journal) => journal._id === journalId);
    if (favoriteJournal && !favoriteJournals.includes(favoriteJournal)) {
      const updatedFavoriteJournals = [...favoriteJournals, favoriteJournal];
      setFavoriteJournals(updatedFavoriteJournals);
      localStorage.setItem(`favoriteJournals_${user.username}`, JSON.stringify(updatedFavoriteJournals));
    }
  };

  return (
    <main>
      <div className="home-wrapper">
        {searchedJournals.map((journal) => (
          <div key={journal._id}>
            <Link to={`/journal/${journal._id}`} className='journal'>
              <JournalDetails journal={journal} />
            </Link>
            {user.role === 'pembaca' && (
              <button onClick={() => handleFavorite(journal._id)} className="add-favorite-button">
                <span className="material-symbols-outlined">
                  add
                </span>
              </button>
            )}
          </div>
        ))}
        {user.role === 'penulis' && (
          <Link to="/form">
            <img src={plusIcon} className="plus-icon" />
          </Link>
        )}
        {!user.isPremium && (
          <Link to="/premium">
            <img src={premium} className="premium-icon" />
          </Link>
        )}
      </div>
    </main>
  )
}

export default Home