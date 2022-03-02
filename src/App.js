import React, { useState } from 'react'
import './App.css'
import SearchResults from './SearchResults'

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

      <SearchResults searchResults={searchResult} />
    </div>
  )
}

export default App
