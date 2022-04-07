function SearchBox({searchValue, onSearchValueChange, search}) {
    return (
        <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={onSearchValueChange}
        />
        <button onClick={search}>Search</button>
      </div>
    )
}

export { SearchBox }