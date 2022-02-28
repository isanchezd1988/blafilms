import React from 'react'
import Search from './search'
import SearchResults from './search-results'
import { MOVIES_STATES } from './home.business'

function Home({ movies, isLoading, isError, error }) {
  return (
    <div className="App">
      <Search />
      {isLoading ? (
        <p>{MOVIES_STATES.loading}</p>
      ) : isError ? (
        <p>{error}</p>
      ) : movies?.length > 0 ? (
        <SearchResults movies={movies} />
      ) : (
        <p>{MOVIES_STATES.empty}</p>
      )}
    </div>
  )
}

export default Home
