import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import placeholderImg from './placeholder.png'
import './search-results.styles.css'

export default function SearchResults({ movies }) {
  return (
    <div className="search-results">
      <div className="chevron">
        <ChevronLeft />
      </div>
      <ul className="search-results-list">
        {movies.map(movie => (
          <li key={movie.id} className="search-item">
            <img
              src={movie.poster === 'N/A' ? placeholderImg : movie.poster}
              alt="poster"
            />
            <div className="search-item-data">
              <div className="title">{movie.title}</div>
              <div className="meta">{`${movie.type} | ${movie.year}`}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="chevron">
        <ChevronRight />
      </div>
    </div>
  )
}
