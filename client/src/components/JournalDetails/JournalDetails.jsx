import React from 'react'
import "./JournalDetails.css"

const JournalDetails = ({ journal }) => {
  return (
    <div className="journal-wrapper">
      <div className="journal-details">
        <h1>{journal.title}</h1>
        <p>{journal.author}</p>
      </div>
    </div>
  )
}

export default JournalDetails