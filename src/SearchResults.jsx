import React from 'react'
import PropTypes from 'prop-types'
import './SearchResults.css'
import placeholderImg from './assets/placeholder.png'
import { ReactComponent as ChevronLeft } from './assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg'

const SearchResults = ({ searchResults, fetchPrevPage, fetchNextPage }) => {
  return !searchResults ? (
    <p>No results yet</p>
  ) : (
    <div className="search-results">
      <div className="chevron">
        <button aria-label="prevPage" onClick={fetchPrevPage}>
          <ChevronLeft />
        </button>
      </div>

      <div className="search-results-list">
        {searchResults.Search.map(result => (
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
        <button aria-label="nextPage" onClick={fetchNextPage}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.shape({
    Search: PropTypes.arrayOf(
      PropTypes.shape({
        imdbID: PropTypes.string,
        Poster: PropTypes.string,
        Title: PropTypes.string,
        Type: PropTypes.string,
        Year: PropTypes.string,
      }),
    ),
  }),

  fetchPrevPage: PropTypes.func.isRequired,
  fetchNextPage: PropTypes.func.isRequired,
}

export default SearchResults
