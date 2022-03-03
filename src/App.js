import React, { useState } from 'react'
import './App.css'
import SearchResults from './SearchResults'

const INITIAL_PAGE = 1

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [, setCurrentPage] = useState(INITIAL_PAGE)
  const [searchResult, setSearchResult] = useState()

  const handleSearchQueryChange = event => {
    setSearchQuery(event.target.value)
  }

  const performSearch = async (page = INITIAL_PAGE) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a461e386&s=${searchQuery}&page=${page}`,
    )

    const data = await response.json()

    const hasErrored = data.Response === 'False'

    // TODO: Implement error case
    if (hasErrored) {
      return
    }

    setSearchResult(data)
  }

  const fetchPrevPage = () => {
    setCurrentPage(page => {
      if (page === INITIAL_PAGE) {
        return page
      }

      const nextPage = page - 1

      performSearch(nextPage)

      return nextPage
    })
  }

  const fetchNextPageResults = () => {
    setCurrentPage(page => {
      const availablePages = Math.ceil(
        parseInt(searchResult.totalResults, 10) / 10,
      )
      const areResultsLeft = page < availablePages

      if (!areResultsLeft) {
        return page
      }

      const nextPage = page + 1

      performSearch(nextPage)

      return nextPage
    })
  }

  return (
    <div className="App">
      <div className="search">
        <input
          className="searchBox"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button className="searchButton" onClick={performSearch}>
          Search
        </button>
      </div>

      <SearchResults
        searchResults={searchResult}
        fetchPrevPage={fetchPrevPage}
        fetchNextPage={fetchNextPageResults}
      />
    </div>
  )
}

export default App
