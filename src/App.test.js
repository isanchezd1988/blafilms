import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('when movies are not fetched yet from the API', () => {
    it('indicates the status of waiting for the movies', () => {
      render(<App />)

      // TODO: refactor semantics - https://www.w3.org/TR/wai-aria-1.1/#status
      expect(screen.getByText('No results yet')).toBeInTheDocument()
    })
  })
})
