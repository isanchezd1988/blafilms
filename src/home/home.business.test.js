import { transformOmdbResponse } from './home.business'

const MOCKED_OMDB_RESPONSE_WITH_ERROR = {
  Response: 'False',
  Error: 'Movie ID not found',
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
  })
})
