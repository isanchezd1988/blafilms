import { transformOmdbResponse } from './home.business'

const MOCKED_OMDB_RESPONSE_WITH_ERROR = {
  Response: 'False',
  Error: 'Movie ID not found',
}

const MOCKED_OMDB_RESPONSE = {
  Search: [
    {
      Title: 'The Lord of the Rings: The Return of the King',
      Year: '2003',
      imdbID: 'tt0167260',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    },
    {
      Title: 'The Lion King',
      Year: '1994',
      imdbID: 'tt0110357',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg',
    },
  ],
  totalResults: '3578',
  Response: 'True',
}

describe('Home business utils', () => {
  describe('transformOmdbResponse', () => {
    it('Response with error', () => {
      const parsedResponse = transformOmdbResponse(
        MOCKED_OMDB_RESPONSE_WITH_ERROR,
      )
      expect(parsedResponse).toEqual({
        error: true,
        message: 'Movie ID not found',
      })
    })
    it('Response without error', () => {
      const parsedResponse = transformOmdbResponse(MOCKED_OMDB_RESPONSE)
      expect(parsedResponse).toEqual({
        error: false,
        movies: [
          {
            title: 'The Lord of the Rings: The Return of the King',
            year: '2003',
            id: 'tt0167260',
            type: 'movie',
            poster:
              'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
          },
          {
            title: 'The Lion King',
            year: '1994',
            id: 'tt0110357',
            type: 'movie',
            poster:
              'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg',
          },
        ],
        totalResults: 3578,
      })
    })
  })
})
