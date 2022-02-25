import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  describe('when just mounted', () => {
    it('shows a default message', () => {
      render(<App />)

      expect(screen.getByText('No results yet')).toBeInTheDocument()
    })
  })
})
