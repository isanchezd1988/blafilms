const ENDPOINT = 'http://www.omdbapi.com/?apikey=a461e386'

const ITEMS_PER_PAGE = 10

export async function fetchFilms(searchTerm, page = 1) {
  if (searchTerm.length < 3) {
    return {
      results: [],
      hasPreviousPage: false,
      hasNextPage: false,
    }
  }

  const params = new URLSearchParams()

  params.append('s', searchTerm)
  params.append('page', page)

  const response = await fetch(`${ENDPOINT}&${params.toString()}`)
  const data = await response.json()

  return {
    results: data.Search || [],
    hasPreviousPage: page > 1,
    hasNextPage: ITEMS_PER_PAGE * page < Number(data.totalResults),
  }
}
