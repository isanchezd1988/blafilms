const RESPONSE_WITH_ERROR = 'False'

/**
 * Object returned when the OMDB API returns an error
 * @typedef { Object } ParsedOmdbResponseWithError
 * @property { boolean } error - If the response has an error
 * @property { string } message - The detailed response error
 */

/**
 * Object returned when the OMDB API returns a response without error
 * @typedef { Object } ParsedOmdbResponse
 * @property { boolean } error - If the responsse has an error
 * @property { Object[] } movies - The movies
 * @property { number } totalResults - All the results for a search
 */

/**
 * The OMDB API is a little bit peculiar. We create this business function to
 * better handle the responses
 *
 * @param { Object } response - The OMDB api response (http://www.omdbapi.com/)
 * @returns { ParsedOmdbResponseWithError | ParsedOmdbResponse }
 */
const transformOmdbResponse = response => {
  if (response.Response === RESPONSE_WITH_ERROR) {
    return {
      error: true,
      message: response.Error,
    }
  }

  const movies = response.Search.map(movie => ({
    id: movie.imdbID,
    poster: movie.Poster,
    title: movie.Title,
    type: movie.Type,
    year: movie.Year,
  }))

  return {
    error: false,
    movies,
    totalResults: response.totalResults,
  }
}

const MOVIES_STATES = {
  loading: 'Loading movies',
  empty: 'Use the search field to find a movie',
}

export { transformOmdbResponse, MOVIES_STATES }
