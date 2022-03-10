import { render, screen, within } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('when just mounted', () => {
    it('shows a default message', () => {
      render(<App />)

      expect(screen.getByText('No results yet')).toBeVisible()
    })

    it("doesn't show a list of movies", () => {
      render(<App />)

      expect(screen.queryByRole('list')).toBeNull()
    })

    it('shows an empty searchbox', () => {
      render(<App />)

      const searchBox = screen.getByRole('searchbox')

      expect(searchBox).toBeVisible()
      expect(searchBox.value).toBe('')
    })
  })

  describe('when loaded', () => {
    it('shows a default movies list', async () => {
      render(<App />)

      const movieList = await screen.findByRole('list')

      expect(movieList).toBeVisible()
      expect(within(movieList).getAllByRole('listitem').length).toBeGreaterThan(
        0,
      )
    })
  })
})
