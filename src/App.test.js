import { render, screen, waitFor } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'

import App from './App'

enableFetchMocks()

const mock = {
  Search: [
    {
      Title: 'King Kong',
      Year: '2005',
      imdbID: 'tt0360717',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjYxYmRlZWYtMzAwNC00MDA1LWJjNTItOTBjMzlhNGMzYzk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      Title: 'The Lion King',
      Year: '2019',
      imdbID: 'tt6105098',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg',
    },
  ],
}

// REVIEW fetch is being called more than once, so `fetchMock.mockResponseOnce`
// does not work
describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders a message while data is fetching', () => {
    fetch.mockResponse(JSON.stringify({ Search: [] }))

    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('after data is fetched, renders a grid of films', async () => {
    fetch.mockResponse(JSON.stringify(mock))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('King Kong')).toBeInTheDocument()
      expect(screen.getByText('The Lion King')).toBeInTheDocument()
    })
  })
})
