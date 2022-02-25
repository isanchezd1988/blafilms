import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('Starts with no results on screen', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
