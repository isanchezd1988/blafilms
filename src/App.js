import React, { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { getMovies } from './services'

const App = () => {
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
              <Card result={result} key={result.imdbID} />
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
