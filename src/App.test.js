import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('starts without preloaded films', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
