import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders default text on empty results', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
