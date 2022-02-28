import { render, screen } from '@testing-library/react'

import { MOVIES_STATES } from './home.business'
import { movies_searched_by_king } from './home.mocks'
import Home from './home.view'

describe('Movies App', () => {
  describe('Home', () => {
    describe('Empty states', () => {
      it('When there are `null` results, shows a message indicating it', () => {
        render(<Home movies={null} />)
        expect(screen.getByText(MOVIES_STATES.empty)).toBeInTheDocument()
      })
      it('When there are an empty list, shows a message indicating it', () => {
        render(<Home movies={[]} />)
        expect(screen.getByText(MOVIES_STATES.empty)).toBeInTheDocument()
      })
    })
    describe('Loading movies', () => {
      it('When the movies are loading, shows a message indicating it', () => {
        render(<Home isLoading />)
        expect(screen.getByText(MOVIES_STATES.loading)).toBeInTheDocument()
      })
    })
    describe('Failures', () => {
      it('When the Home has an error, shows the message', () => {
        const errorMessage = 'This could be any error message'
        render(<Home isError error={errorMessage} />)
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
    })
    describe('Listing the movies', () => {
      it('When we pass a list of movies, they are showed', () => {
        render(<Home movies={movies_searched_by_king} />)
        const movies = screen.getAllByRole('listitem')
        expect(movies.length).toBeGreaterThan(0)
      })
    })
  })
})
