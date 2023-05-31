import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Form.css"
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

const Form = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [fileData, setFileData] = useState('')
  const [pdf, setFile] = useState("")
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('title', title)
    formData.append('author', author)
    formData.append('pdf', fileData)

    try {
      const response = await axios.post('http://localhost:8080/api/journal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });

      console.log('res', response.data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log('Server Response:', error.response.data);
        console.log('Status Code:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };


  return (
    <div className="form-wrapper">
      <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add a new journal</h2>

        <input type="text" placeholder="Title" className="form-input" onChange={(e) => setTitle(e.target.value)} value={title} />
        <input type="text" placeholder="Author" className="form-input" onChange={(e) => setAuthor(e.target.value)} value={author} />

        <input type="file" id="file-input" accept="application/pdf" onChange={handleFileChange} value={pdf} />
        <p>*.pdf (maks. 10MB)</p>

        <button type="submit" id="submit-button">Add</button>
      </form>
    </div>
  )
}

export default Form