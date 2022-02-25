import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

    it('does not contain an element with class search-results', () => {
      const { container } = render(<App />)

      expect(container.getElementsByClassName('search-results').length).toBe(0)
    })
  })

  describe('On typing', () => {
    it('does not automatically search', () => {
      const { container } = render(<App />)

      userEvent.type(screen.getByTitle('Search input'), 'test')

      expect(screen.getByText('No results yet')).toBeInTheDocument()
      expect(container.getElementsByClassName('search-results').length).toBe(0)
    })

    it('searches after button click', async () => {
      const { container } = render(<App />)

      userEvent.type(screen.getByTitle('Search input'), 'test')
      userEvent.click(screen.getByRole('button', { title: 'Click to search' }))

      await waitFor(() =>
        expect(container.getElementsByClassName('search-results').length).toBe(
          1,
        ),
      )
    })
  })
})
