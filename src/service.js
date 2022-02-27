const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchResults = async (searchInput, page = 1) => {
  try {
    const results = await fetch(
      `${API_URL}/?apikey=${API_KEY}&s=${searchInput}&page=${page}`,
    ).then(res => res.json())

    if (results.Response === 'True') {
      return results.Search
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
