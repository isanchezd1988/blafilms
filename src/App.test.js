import { render, screen, waitFor, within } from '@testing-library/react'

import App from './App'

const itRendersSearchControls = () => {
  it('renders an input search', () => {
    // TODO: refactor semantics - aria-label, type[search]
    expect(screen.getByPlaceholderText('Search...')).toBeVisible()
  })
  it('renders the search button', () => {
    // TODO: refactor semantics - aria-label
    const searchButton = screen.getByRole('button')
    expect(searchButton).toBeVisible()
    expect(searchButton).toHaveTextContent('Search')
  })
}

const moviesAreLoaded = async () => {
  await waitFor(() => screen.getByText('King Kong'))
}

const getListOfMovies = () => screen.getByRole('list')

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })
  describe('when movies are not fetched yet from the API', () => {
    it('indicates the status of waiting for the movies', () => {
      // TODO: refactor semantics - https://www.w3.org/TR/wai-aria-1.1/#status
      expect(screen.getByText('No results yet')).toBeVisible()
    })
    itRendersSearchControls()
  })
  describe('when movies are fetched from the API', () => {
    beforeEach(async () => {
      await moviesAreLoaded()
    })
    itRendersSearchControls()
    it('renders the list of movies', () => {
      expect(getListOfMovies()).toBeVisible()
    })
    it('renders list items inside the list of movies', () => {
      const movieListItems = within(getListOfMovies()).getAllByRole('listitem')
      expect(movieListItems.length).toBeGreaterThan(0)
    })
  })
})
