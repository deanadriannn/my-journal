import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import "./Journal.css"
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

const Journal = () => {
  const { id } = useParams()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pdf, setPdf] = useState('')

  const getJournalById = useCallback(async () => {
    const response = await axios.get(`http://localhost:8080/api/journal/${id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    setTitle(response.data.title);
    setAuthor(response.data.author);
    setPdf(response.data.pdf);
  }, [id]);

  useEffect(() => {
    getJournalById();
  }, [getJournalById]);


  return (
    <div className="single-journal-wrapper">
      <h3>{title}</h3>
      <p>{author}</p>
      <iframe src={pdf} width="80%" height="600px"></iframe>

    </div>
  )
}

export default Journal