import { render, screen } from '@testing-library/react'

import { MOVIES_STATES } from './home.business'
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
  })
})
