import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [search, setSearch] = useState('')
  const [searchPage, setSearchPage] = useState(1)

  useEffect(() => doSearch(), [searchPage])

  const doSearch = async () => {
    const queryParamSearch = search ? `&s=${search}` : ''
    const queryParamPage = `&page=${searchPage}`
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a461e386${queryParamSearch}${queryParamPage}`,
    )

    const data = await response.json()

    setSearchResult({
      ...data,
      Search: data.Search || [],
    })
  }

  const goBeforePage = () => {
    if (searchPage > 1) setSearchPage(searchPage - 1)
  }
  const goNextPage = () => setSearchPage(searchPage + 1)

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
        <button onClick={doSearch}>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft onClick={goBeforePage} />
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
            <ChevronRight onClick={goNextPage} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
