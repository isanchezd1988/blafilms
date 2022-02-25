import React, { useRef, useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const searchRef = useRef()
  const [query, setQuery] = useState('king')
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    const search = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${query}`,
      )

      const data = await response.json()

      setSearchResult(data)
    }

    search()
  }, [query, setSearchResult])

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search..." ref={searchRef} />
        <button onClick={() => setQuery(searchRef.current?.value)}>
          Search
        </button>
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
                  alt={`${result.Title} (${result.Year})`}
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
