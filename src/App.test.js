import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('fails', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('renders', () => {
    render(<App />)

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
})

describe('Input value', () => {
  it('value updates on change', () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText('Search')

    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})
