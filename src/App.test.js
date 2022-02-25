import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders a message while data is fetching', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
