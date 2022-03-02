import React, { useState } from 'react'
import './App.css'
import placeholderImg from './assets/placeholder.png'
import { ReactComponent as ChevronLeft } from './assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState()

  const handleSearchQueryChange = event => {
    setSearchQuery(event.target.value)
  }

  const performSearch = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a461e386&s=${searchQuery}`,
    )

    const data = await response.json()

    const hasErrored = data.Response === 'False'

    // TODO: Implement error case
    if (hasErrored) {
      return
    }

    setSearchResult(data)
  }

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={performSearch}>Search</button>
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
