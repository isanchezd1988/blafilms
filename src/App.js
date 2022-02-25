import React, { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { getMovies } from './services'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState(1)
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    console.log('inside useEffect', pagination)
    const search = async () => {
      const movies = await getMovies(searchQuery, pagination)

      movies.Response === 'False'
        ? setSearchResult(null)
        : setSearchResult(movies)
    }
    if (searchQuery !== '') {
      search()
    }
  }, [searchQuery, setSearchResult, pagination])

  const handleSearch = e => {
    e.preventDefault()
    setPagination(1)
    setSearchQuery(e.target.search.value)
  }

  const handlePagination = e => {
    const direction = e.target.name

    if (direction === 'right') {
      setPagination(pagination + 1)
    }
    if (direction === 'left') {
      pagination !== 1 && setPagination(pagination - 1)
    }
  }

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
          <div
            className="chevron"
            onClick={() => handlePagination({ target: { name: 'left' } })}
          >
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <Card result={result} key={result.imdbID} />
            ))}
          </div>
          <div
            className="chevron"
            onClick={() => handlePagination({ target: { name: 'right' } })}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
