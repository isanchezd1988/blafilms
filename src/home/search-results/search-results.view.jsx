import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import placeholderImg from './placeholder.png'
import './search-results.styles.css'

export default function SearchResults({ searchResult }) {
  return (
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
  )
}
