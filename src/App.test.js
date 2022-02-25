import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('Starts with no results on screen', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('Displays a button to search', () => {
    render(<App />)

    expect(screen.queryByRole('button', { name: 'Search' })).not.toBeNull()
  })
})
