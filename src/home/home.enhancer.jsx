import { useEffect, useState } from 'react'
import { transformOmdbResponse } from './home.business'

const MOVIES_BASE_URL = 'http://www.omdbapi.com/?apikey=a461e386'

export default function homeEnhancer(Home) {
  return function (props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
      const search = async () => {
        setIsLoading(true)

        try {
          const moviesResponse = await fetch(`${MOVIES_BASE_URL}&s=king`)
          const movies = await moviesResponse.json()
          const parsedMovies = transformOmdbResponse(movies)

          // NOTE: there may be an error searching for a movie but it does not
          // throw an error, so we have to check if the response contained it
          if (parsedMovies.error) {
            setIsError(true)
            setError(parsedMovies.message)
          } else {
            setMovies(parsedMovies.movies)
          }
        } catch (error) {
          setIsError(true)
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }

      search()
    }, [])

    return (
      <Home
        {...props}
        movies={movies}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    )
  }
}
