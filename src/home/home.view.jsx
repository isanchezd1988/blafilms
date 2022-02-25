import React from 'react'
import Search from './search'
import SearchResults from './search-results'

function Home({ searchResult }) {
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

export default Home
