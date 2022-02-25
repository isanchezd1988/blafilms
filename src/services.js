const BASE_URL = 'http://www.omdbapi.com/'
const API_KEY = 'a461e386'

export const getMovies = async movie => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${movie}`)

  const data = await response.json()
  return data
}
