import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

const { getByTestId, getByText, queryByText } = screen

describe('App', () => {
  it('renders no results yet', () => {
    render(<App />)

    expect(getByText('No results yet')).toBeInTheDocument()
  })
  it('renders search results', async () => {
    render(<App />)
    await waitFor(() => getByTestId('search-results'))

    expect(queryByText('No results yet')).not.toBeInTheDocument()
  })
})
