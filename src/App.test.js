import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('fails', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('renders', () => {
    const { queryByPlaceholderText } = render(<App />)

    expect(queryByPlaceholderText('Search...')).toBeTruthy()
  })
})
