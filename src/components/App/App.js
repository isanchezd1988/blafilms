import React, { useState } from 'react'
import './App.css'
import { ReactComponent as ChevronLeft } from './../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from './../../assets/chevron-right.svg'
import { FilmItem } from '../FilmItem/FilmItem'
import { SearchBox } from '../SearchBox/SearchBox'
import { FilmsRepository } from '../../repository/films.repository'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [pageValue, setPageValue] = useState(1)
  const [searchResult, setSearchResult] = useState()

  const onSearchValueChange = event => {
    setSearchValue(event.target.value)
  }

  const search = () => {
    FilmsRepository.getFilms(searchValue, pageValue)
    .then(films => setSearchResult(films));
  }

  const incrementPage = () => {
    setPageValue(pageValue + 1)
    search()
  }

  const decrementPage = () => {
    setPageValue(pageValue > 0 ? pageValue - 1 : pageValue)
    search()
  }

  return (
    <div className="App">
      <SearchBox searchValue={searchValue} onSearchValueChange={onSearchValueChange} search={search}/>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft onClick={decrementPage}/>
          </div>
          <div className="search-results-list">
            {searchResult.map((result, index) => (
              <FilmItem key={index} film={ result } />
            ))}
          </div>
          <div className="chevron">
            <ChevronRight onClick={incrementPage}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
