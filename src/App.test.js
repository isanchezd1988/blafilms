import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
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

describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders a message while data is fetching', async () => {
    fetch.mockResponseOnce(JSON.stringify({ Search: [] }))

    render(<App />)

    const message = screen.queryByText('No results yet')
    expect(message).toBeInTheDocument()
    // NOTE avoid error message because the component's state is updated after
    // the test finishes
    await waitForElementToBeRemoved(message)
  })

  it('renders a search bar', async () => {
    fetch.mockResponseOnce(JSON.stringify({ Search: [] }))

    render(<App />)

    expect(screen.queryByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    // NOTE avoid error message because the component's state is updated after
    // the test finishes
    await waitForElementToBeRemoved(screen.queryByText('No results yet'))
  })

  it('after data is fetched, renders a grid of films', async () => {
    fetch.mockResponseOnce(JSON.stringify(mock))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('King Kong')).toBeInTheDocument()
      expect(screen.getByText('The Lion King')).toBeInTheDocument()
    })
  })

  it('for each film, renders its details', async () => {
    fetch.mockResponseOnce(JSON.stringify(mock))

    render(<App />)

    await waitForElementToBeRemoved(screen.queryByText('No results yet'))
    expect(screen.getByText('movie | 2005')).toBeInTheDocument()
    expect(screen.getByText('movie | 2019')).toBeInTheDocument()
    expect(screen.getByAltText('King Kong (2005)')).toBeInTheDocument()
    expect(screen.getByAltText('The Lion King (2019)')).toBeInTheDocument()
  })
})
