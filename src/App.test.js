import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('On load', () => {
    it('renders the search input', () => {
      render(<App />)

      expect(screen.getByTitle('Search input')).toBeInTheDocument()
    })

    it('renders the button to search', () => {
      render(<App />)

      expect(
        screen.getByRole('button', { title: 'Click to search' }),
      ).toBeInTheDocument()
    })

    it('renders "No results yet" text', () => {
      render(<App />)

      expect(screen.getByText('No results yet')).toBeInTheDocument()
    })
  })
})
