import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('displays "no results" message while having no movies', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
