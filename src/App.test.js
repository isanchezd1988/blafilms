import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import App from './App'
import films from './mocks/films'

const SEARCH_TERM = 'iron man'

describe('App', () => {
  describe('First render', () => {
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
      // + Info: https://testing-library.com/docs/react-testing-library/intro/
      // DUDA: Si el test no tiene porque conocer como esta implementado el codigo,
      // ¿porque el codigo de la app si necesita saber como es necesario implementar los atributos de data-testid?
      expect(screen.getByTestId('search')).toBeInTheDocument()
    })

    it('Search results container is not in the document in first render.', async () => {
      render(<App />)

      expect(screen.queryByTestId('search-results')).toBeNull()
    })
  })

  describe('Search films', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(films),
      })
    })

    it('When search term is introduced, results will be rendered', async () => {
      render(<App />)

      const searchContainer = screen.getByTestId('search')
      const input = searchContainer.querySelector('input[type="text"]')

      await act(async () =>
        // NOTE: Usado delay para simular el input del usuario,
        // si se introduce de golpe (sin delay) al ser un
        // input vinculado al estado solo se guarda el ultimo caracter.
        userEvent.type(input, 'iron{space}man', { delay: 1 }),
      )

      expect(input).toHaveValue(SEARCH_TERM)

      const searchResultsContainer = screen.getByTestId('search-results')

      expect(searchResultsContainer).toBeInTheDocument()
      expect(screen.getAllByTestId('search-result-item')).toHaveLength(
        films.Search.length,
      )
    })
  })

  describe('Pagination', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(films),
      })
    })

    it('When first page is rendered, next page will become available and not previous page', async () => {
      render(<App />)

      const searchContainer = screen.getByTestId('search')
      const input = searchContainer.querySelector('input[type="text"]')

      await act(async () =>
        userEvent.type(input, 'iron{space}man', { delay: 1 }),
      )

      const nextPageTrigger = screen.queryByTestId('next-page')
      const previousPageTrigger = screen.queryByTestId('previous-page')

      expect(nextPageTrigger).toBeInTheDocument('next-page')
      expect(previousPageTrigger).not.toBeInTheDocument('next-page')
    })

    it('When user navigates to second page, previous page become avaiable', async () => {
      render(<App />)

      const searchContainer = screen.getByTestId('search')
      const input = searchContainer.querySelector('input[type="text"]')

      await act(async () =>
        userEvent.type(input, 'iron{space}man', { delay: 1 }),
      )

      const nextPageTrigger = screen.queryByTestId('next-page')

      await act(async () => userEvent.click(nextPageTrigger))

      expect(nextPageTrigger).toBeInTheDocument('next-page')
    })
  })
})
