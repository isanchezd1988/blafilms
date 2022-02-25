import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { fetchFilms } from './filmsService'

function App() {
  const [films, setFilms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleFetchFilms = useCallback(async () => {
    searchTerm && setFilms(await fetchFilms(searchTerm))
  }, [searchTerm])

  useEffect(() => handleFetchFilms(), [handleFetchFilms])

  return (
    <div className="App">
      <div className="search" data-testid="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          name="search"
        />
        <button>Search</button>
      </div>
      {films.length === 0 ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results" data-testid="search-results">
          <div className="chevron">
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {films.map((result, i) => (
              <div
                key={`${result.imdbID}-${i}`}
                className="search-item"
                data-testid="search-result-item"
              >
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
