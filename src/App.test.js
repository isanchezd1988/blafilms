import { render, screen, act, fireEvent } from '@testing-library/react'
import fetchMock from 'fetch-mock'

import App from './App'
import OMDB_URL from './App'

describe('App', () => {
  it('Starts with no results on screen', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('Displays a button to search', () => {
    render(<App />)

    expect(screen.queryByRole('button', { name: 'Search' })).not.toBeNull()
  })
})

describe('Search films', () => {
  it('Input value is properly setted', async () => {
    render(<App />)

    const searchValue = 'nemo'

    const searchValueInput = screen.getByPlaceholderText('Search...')

    await act(async () => {
      fireEvent.change(searchValueInput, { target: { value: searchValue } })
    })

    const settedSearchValue = screen.getByDisplayValue(searchValue)

    expect(settedSearchValue).not.toBeNull()
  })

  it('API fetchs with input value info', async () => {
    render(<App />)

    const searchValue = 'nemo'
    const apiUrl = `${OMDB_URL}&s=${searchValue}`

    const searchValueInput = screen.getByPlaceholderText('Search...')

    await act(async () => {
      fireEvent.change(searchValueInput, { target: { value: searchValue } })
    })

    const searchButton = screen.getByRole('button', { name: 'Search' })

    const searchFilmsMock = fetchMock.mock(apiUrl, { status: 200, body: {} })

    await act(async () => {
      fireEvent.click(searchButton)
    })

    expect(searchFilmsMock.called(apiUrl)).toBe(true)
  })
})
