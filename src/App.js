import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import InputSearch from './InputSearch'

function App() {
  const [searchResult, setSearchResult] = useState()

  const searchMovies = query => {
    if (!!query) {
      getMovies(query)
    }
  }

  const getMovies = useCallback(
    async value => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=a461e386&s=${value}`,
        )
        const data = await response.json()
        if (data.Search && data.Search.length) {
          setSearchResult(data)
        } else {
          setSearchResult([])
        }
      } catch (ex) {
        alert(ex)
      }
    },
    [setSearchResult],
  )

  useEffect(() => {
    getMovies('king')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <InputSearch searchAction={searchMovies} />

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
