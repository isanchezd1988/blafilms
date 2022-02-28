import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'

import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

import { fetchResults } from './service'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState()
  const [results, setResults] = useState([])

  const handleSearch = useCallback(async (searchInput, page) => {
    const response = await fetchResults(searchInput, page)
    const results = response?.results ?? []
    setResults(results)
    const numberOfPages = response?.numberOfPages ?? undefined
    setNumberOfPages(numberOfPages)
  }, [])

  const handleFormSubmit = async ev => {
    ev.preventDefault()
    handleSearch(searchInput, page)
  }

  useEffect(() => {
    handleSearch(searchInput, page)
  }, [page, handleSearch])

  return (
    <div className="App">
      <form className="search" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={ev => setSearchInput(ev.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {results.length === 0 ? (
        <div className="search-no-results">
          <p>No results yet</p>
        </div>
      ) : (
        <div className="search-results">
          <button
            aria-label="prev-page"
            className={cx('chevron', page === 1 ? 'is-disabled' : 'is-active')}
            onClick={() => page > 1 && setPage(page - 1)}
          >
            <ChevronLeft />
          </button>
          <ul className="search-results-list">
            {results.map(result => (
              <li key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </li>
            ))}
          </ul>
          <button
            aria-label="next-page"
            className={cx(
              'chevron',
              page === numberOfPages ? 'is-disabled' : 'is-active',
            )}
            onClick={() => page < numberOfPages && setPage(page + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default App
