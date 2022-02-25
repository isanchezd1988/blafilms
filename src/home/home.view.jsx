import React, { useState, useEffect } from 'react'
import Search from './search'
import SearchResults from './search-results'

function App() {
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    const search = async () => {
      const response = await fetch(
        'http://www.omdbapi.com/?apikey=a461e386&s=king',
      )

      const data = await response.json()

      if (!searchResult) {
        setSearchResult(data)
      }
    }

    search()
  }, [])

  return (
    <div className="App">
      <Search />
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <SearchResults searchResult={searchResult} />
      )}
    </div>
  )
}

export default App
