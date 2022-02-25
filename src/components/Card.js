import React from 'react'
import placeholderImg from '../placeholder.png'

const Card = ({ result }) => {
  return (
    <div className="search-item">
      <img
        src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
        alt="poster"
      />
      <div className="search-item-data">
        <div className="title">{result.Title}</div>
        <div className="meta">{`${result.Type} | ${result.Year}`}</div>
      </div>
    </div>
  )
}

export default Card
