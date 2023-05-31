import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Home.css"
import { JournalDetails } from '../../components'
import { plusIcon } from '../../assets'
import { useAuthContext } from '../../hooks/useAuthContext'

const Home = ({ searchValue }) => {
  const { user } = useAuthContext()
  const [journals, setJournals] = useState([])
  const [searchedJournals, setSearchedJournals] = useState([])

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/journal', {
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

  useEffect(() => {
    if (searchValue !== '') {
      setSearchedJournals(journals.filter((journal) => journal.title.toLowerCase().includes(searchValue.toLowerCase())))
    } else {
      setSearchedJournals(journals)
    }
  }, [searchValue, journals])

  return (
    <main>
      <div className="home-wrapper">
        {searchedJournals.map((journal) => (
          <Link to={`/journal/${journal._id}`} key={journal._id}>
            <JournalDetails journal={journal} />
          </Link>
        ))}
        <Link to="/form">
          <img src={plusIcon} className="plus-icon" />
        </Link>
      </div>
    </main>
  )
}

export default Home