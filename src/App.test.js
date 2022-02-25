import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'
import InputSearch from './InputSearch'

describe('App', () => {
  it('fails', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('renders', () => {
    render(<App />)

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
})

describe('Input value', () => {
  it('value updates on change', () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText('Search...')

    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})

describe('Search button', () => {
  it('when no query, it will not trigger api request', () => {
    const apiRequest = jest.fn()

    render(<InputSearch searchAction={apiRequest} />)

    const button = screen.getByText('Search')

    fireEvent.click(button)

    expect(apiRequest).not.toHaveBeenCalled()
  })
  it('when query is not empty, it will trigger api request', () => {
    const apiRequest = jest.fn()

    render(<InputSearch searchAction={apiRequest} />)

    const searchInput = screen.getByPlaceholderText('Search...')
    const button = screen.getByText('Search')

    fireEvent.change(searchInput, { target: { value: 'test' } })
    fireEvent.click(button)

    expect(apiRequest).toHaveBeenCalled()
  })
})
