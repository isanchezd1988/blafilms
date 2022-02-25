import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('when just mounted', () => {
    it('shows a default message', () => {
      render(<App />)

      expect(screen.getByText('No results yet')).toBeInTheDocument()
    })

    it("doesn't show a list of movies", () => {
      render(<App />)

      expect(screen.queryByRole('list')).toBeNull()
    })
  })

  describe('when loaded', () => {
    it('shows a default movies list', async () => {
      render(<App />)

      expect(await screen.findByRole('list')).toBeInTheDocument()
    })
  })
})
