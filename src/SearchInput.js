const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={value}
    onChange={evt => onChange(evt.target.value)}
  />
)

export default SearchInput
