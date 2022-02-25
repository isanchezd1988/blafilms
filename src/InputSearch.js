import React, { useState } from 'react'

const InputSearch = ({ searchAction }) => {
  const [query, setQuery] = useState('')

  const onInputChange = input => {
    if (input.trim().length > 2) setQuery(input)
  }

  const onButtonClicked = () => {
    searchAction(query)
  }
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        onChange={e => onInputChange(e.target.value)}
      />
      <button disabled={query === ''} onClick={onButtonClicked}>
        Search
      </button>
    </div>
  )
}

export default InputSearch
