import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import List from './List'
import SearchInput from './SearchInput'
import { SearchNavPrev, SearchNavNext } from './searchNav'
import SearchNoResults from './SearchNoResults'

const getTotalPages = (resultsPerPage, totalResults) => {
  return Math.ceil(totalResults / resultsPerPage)
}

function App() {
  const FIRST_PAGE = 1
  const [searchResult, setSearchResult] = useState()
  const [search, setSearch] = useState('')
  const [searchPage, setSearchPage] = useState(FIRST_PAGE)

  useEffect(() => doSearch(), [searchPage])

  const doSearch = async ({ resetPages } = {}) => {
    const page = resetPages ? FIRST_PAGE : searchPage
    if (resetPages) setSearchPage(page)

    const queryParamSearch = search ? `&s=${search}` : ''
    const queryParamPage = `&page=${page}`
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=a461e386${queryParamSearch}${queryParamPage}`,
    )

    const data = await response.json()

    setSearchResult({
      Search: data.Search || [],
      totalResults: data.totalResults || 0,
    })
  }

  const handleClickSearch = () => {
    doSearch({ resetPages: true })
  }

  const goPrevPage = () => {
    if (searchPage > 1) setSearchPage(searchPage - 1)
  }
  const goNextPage = () => {
    const totalPages = getTotalPages(10, searchResult.totalResults)
    if (totalPages > searchPage) setSearchPage(searchPage + 1)
  }

  return (
    <div className="App">
      <div className="search">
        <SearchInput value={search} onChange={setSearch} />
        <button onClick={handleClickSearch}>Search</button>
      </div>
      {!searchResult ? (
        <SearchNoResults />
      ) : (
        <div className="search-results">
          <SearchNavPrev onClick={goPrevPage} />
          <List>
            {searchResult.Search.map((result, index) => (
              <div key={`${result.imdbID}_${index}`} className="search-item">
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
          </List>
          <SearchNavNext onClick={goNextPage} />
        </div>
      )}
    </div>
  )
}

export default App
