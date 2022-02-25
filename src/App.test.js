import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders a message while data is fetching', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('after data is fetched, renders a grid of films', async () => {
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText('The Lord of the Rings: The Return of the King'),
      ).toBeInTheDocument()
      expect(screen.getByText('King Kong')).toBeInTheDocument()
    })
  })
})
