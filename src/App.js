import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { getMovies } from './services'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const handleSearch = e => {
    e.preventDefault()
    setSearchQuery(e.target.search.value)
  }

  useEffect(() => {
    const search = async () => {
      const movies = await getMovies(searchQuery)

      movies.Response === 'False'
        ? setSearchResult(null)
        : setSearchResult(movies)
    }
    if (searchQuery !== '') {
      search()
    }
  }, [searchQuery, setSearchResult])

  return (
    <div className="App">
      <form className="search" onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." name="search" />
        <button>Search</button>
      </form>
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
