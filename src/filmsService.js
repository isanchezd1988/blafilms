const ENDPOINT = 'http://www.omdbapi.com/?apikey=a461e386'

export async function fetchFilms(searchTerm) {
  if (searchTerm.length < 3) {
    return []
  }

  const response = await fetch(`${ENDPOINT}&s=${searchTerm}`)
  const data = await response.json()

  return data.Search || []
}
