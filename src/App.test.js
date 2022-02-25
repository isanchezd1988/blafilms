import { render, screen, act, fireEvent } from '@testing-library/react'

import App from './App'

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
})