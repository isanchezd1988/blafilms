const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY
const NUMBER_OF_RESULTS_PER_PAGE = 10

export const fetchResults = async (searchInput, page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&s=${searchInput}&page=${page}`,
    ).then(res => res.json())

    if (response.Response === 'True') {
      const results = response.Search
      const numberOfPages = Math.ceil(
        response.totalResults / NUMBER_OF_RESULTS_PER_PAGE,
      )
      return { results, numberOfPages }
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
