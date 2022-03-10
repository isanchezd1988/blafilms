import { render, within } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('when just mounted', () => {
    it('shows a default message', () => {
      const { getByText } = render(<App />)

      expect(getByText('No results yet')).toBeVisible()
    })

    it("doesn't show a list of movies", () => {
      const { queryByRole } = render(<App />)

      expect(queryByRole('list')).toBeNull()
    })

    it('shows an empty searchbox', () => {
      const { getByRole } = render(<App />)

      const searchBox = getByRole('searchbox')

      expect(searchBox).toBeVisible()
      expect(searchBox.value).toBe('')
    })
  })

  describe('when loaded', () => {
    it('shows a default movies list', async () => {
      const { findByRole } = render(<App />)

      const movieList = await findByRole('list')

      expect(movieList).toBeVisible()
      expect(within(movieList).getAllByRole('listitem').length).toBeGreaterThan(
        0,
      )
    })
  })
})
