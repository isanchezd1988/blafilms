import { render, screen } from '@testing-library/react'

import App from './home.view'

describe('App', () => {
  it('fails', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})
