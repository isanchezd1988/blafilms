import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('First render outputs 0 results.', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('Search bar is present even if there is no results.', () => {
    render(<App />)

    // NOTE: Se usa getByTestId (añadiendo previamente data-testid="search" al elemento)
    // para evitar usar otro metodo de selección, como por ejemplo el className, ya que
    // es un detalle de implementación y deberiamos alejarnos de conocer ese detalle,
    // para la mantenibilidad de los tests.
    expect(screen.getByTestId('search')).toBeInTheDocument()
  })

  it('Search results container is not in the document in first render.', async () => {
    render(<App />)

    expect(screen.queryByTestId('search-results')).toBeNull()
  })
})
