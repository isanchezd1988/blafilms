const BASE_URL = 'http://www.omdbapi.com/'
const API_KEY = 'a461e386'

export const getMovies = async (movie, page) => {
  const pagination = page && page !== 1 ? `&page=${page}` : ''
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${movie}${pagination}`,
  )

  const data = await response.json()
  return data
}
