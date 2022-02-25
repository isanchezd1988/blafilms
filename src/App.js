import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

export const OMDB_URL = 'http://www.omdbapi.com/?apikey=a461e386'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [searchValue, setSearchValue] = useState('')

  const searchFilms = async () => {
    if (!searchValue) return

    const response = await fetch(`${OMDB_URL}&s=${searchValue}`, {
      method: 'GET',
    })

    const data = await response.json()

    setSearchResult(data)
  }

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={ev => setSearchValue(ev.target.value)}
        />
        <button onClick={searchFilms}>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
