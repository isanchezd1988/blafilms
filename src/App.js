import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { fetchFilms } from './filmsService'

const MIN_PAGE = 1
const MAX_PAGE = 100

function App() {
  const [films, setFilms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  const handleFetchFilms = useCallback(async () => {
    if (!searchTerm) return

    const { results, hasNextPage, hasPreviousPage } = await fetchFilms(
      searchTerm,
      page,
    )

    setFilms(results)
    setHasNextPage(hasNextPage)
    setHasPreviousPage(hasPreviousPage)
  }, [searchTerm, page])

  const handlePreviousPage = () => setPage(Math.max(page - 1, MIN_PAGE))
  const handleNextPage = () => setPage(Math.min(page + 1, MAX_PAGE))

  const handleSearchChange = term => {
    setSearchTerm(term)
    setPage(1)
  }

  useEffect(() => handleFetchFilms(), [handleFetchFilms])

  return (
    <div className="App">
      <div className="search" data-testid="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={event => handleSearchChange(event.target.value)}
          name="search"
        />
        <button>Search</button>
      </div>
      {films.length === 0 ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results" data-testid="search-results">
          <div className="chevron">
            {hasPreviousPage && (
              <ChevronLeft
                data-testid="previous-page"
                onClick={handlePreviousPage}
              />
            )}
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
            {hasNextPage && (
              <ChevronRight onClick={handleNextPage} data-testid="next-page" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
