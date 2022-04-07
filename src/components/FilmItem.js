import React from 'react'
import placeholderImg from './../placeholder.png'

function FilmItem({film}) {

  return (
    <div className="search-item">
      <img
        src={film.poster ? film.poster: placeholderImg}
        alt="poster"
      />
      <div className="search-item-data">
        <div className="title">{film.title}</div>
        <div className="meta">{`${film.type} | ${film.year}`}</div>
      </div>
    </div>
  )
}

export { FilmItem }
