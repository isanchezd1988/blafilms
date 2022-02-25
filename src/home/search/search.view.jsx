import './search.styles.css'

export default function Search({ onSearchClick }) {
  return (
    <div className="search">
      <input type="text" placeholder="Search..." />
      <button onClick={onSearchClick}>Search</button>
    </div>
  )
}
