import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

const OMDB_API_KEY = 'a461e386'
const RESULTS_PER_PAGE = 10

function App() {
  const [searchString, setSearchString] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  const [searchResult, setSearchResult] = useState()

  const handleSearchChange = event => {
    setSearchString(event.target.value)
  }

  const search = useCallback(async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchString}&page=${searchPage}`,
    )

    const data = await response.json()

    setSearchResult(data)
  }, [searchString, searchPage])

  const handleDecrementPage = () => {
    setSearchPage(previousValue => previousValue - 1)
  }

  const handleIncrementPage = () => {
    console.log({ handleIncrementPage, searchPage })
    setSearchPage(previousValue => previousValue + 1)
  }

  useEffect(() => {
    search()
    // NOTE: Not including search as dependency to prevent
    // calling to it when searchString changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage])

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          title="Search input"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <button title="Click to search" onClick={search}>
          Search
        </button>
      </div>
      {!searchResult?.Search?.length ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <button onClick={handleDecrementPage} disabled={searchPage < 2}>
              <ChevronLeft />
            </button>
          </div>

          <div className="search-results-list">
            {searchResult.Search.map((result, idx) => (
              <div key={`${result.imdbID}_${idx}`} className="search-item">
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
            <button
              onClick={handleIncrementPage}
              disabled={
                searchPage >=
                Math.ceil(searchResult.totalResults / RESULTS_PER_PAGE)
              }
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
