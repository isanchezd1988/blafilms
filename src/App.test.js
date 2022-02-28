import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the initial page', () => {
    render(<App />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('No results yet')).toBeInTheDocument()
    expect(screen.queryByRole('prev-page')).toBeNull()
    expect(screen.queryByRole('next-page')).toBeNull()
  })
})
