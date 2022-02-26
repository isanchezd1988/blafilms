import { fetchFilms } from './filmsService'
import films from './mocks/films'

const SEARCH_TERM = 'iron man'

describe('filmsService', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(films),
    })
  })

  it('If short or none search term is provided, will return empty result', async () => {
    const response = await fetchFilms('')

    expect(response.results).toHaveLength(0)
    expect(response.hasPreviousPage).toBe(false)
    expect(response.hasNextPage).toBe(false)
  })

  it('If search term is provided, will return first page results', async () => {
    const response = await fetchFilms(SEARCH_TERM)

    expect(response.results).toHaveLength(10)
    expect(response.hasNextPage).toBe(true)
  })

  it('First page will return hasPreviousPage as false', async () => {
    const response = await fetchFilms(SEARCH_TERM)

    expect(response.results).toHaveLength(10)
    expect(response.hasPreviousPage).toBe(false)
  })

  it('If second page is provided, hasPreviousPage will return true', async () => {
    const response = await fetchFilms(SEARCH_TERM, 2)

    expect(response.hasPreviousPage).toBe(true)
  })

  it('If last page possible provided, hasNextPage will return false', async () => {
    const response = await fetchFilms(SEARCH_TERM, 10)

    expect(response.hasNextPage).toBe(false)
  })
})
