import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const SEARCH_QUERY = 'matrix'

const MOVIE_TITLES_PER_PAGE = {
  1: ['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions'],
  2: ['Sex and the Matrix', 'The Matrix Recalibrated'],
  3: [],
}

const performSearch = async () => {
  const searchInput = screen.getByPlaceholderText('Search...')
  const performSearchButton = screen.getByText('Search', {
    selector: 'button',
  })

  await userEvent.type(searchInput, SEARCH_QUERY)

  await userEvent.click(performSearchButton)

  await waitForElementToBeRemoved(() => screen.getByText('No results yet'))
}

describe('End to end App tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders the app correctly the first time', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeVisible()
    expect(screen.getByText('No results yet')).toBeVisible()
  })

  it('allows the user to perform searches with custom keywords', async () => {
    const searchInput = screen.getByPlaceholderText('Search...')
    const performSearchButton = screen.getByText('Search', {
      selector: 'button',
    })

    expect(searchInput).toBeVisible()
    expect(performSearchButton).toBeVisible()

    await userEvent.type(searchInput, SEARCH_QUERY)
    expect(searchInput.value).toBe(SEARCH_QUERY)

    await userEvent.click(performSearchButton)

    await waitForElementToBeRemoved(() => screen.getByText('No results yet'))

    MOVIE_TITLES_PER_PAGE[1].forEach(movieTitle => {
      expect(screen.getByText(movieTitle, { exact: true })).toBeVisible()
    })
  })

  it('allows the user to navigate to different result page', async () => {
    await performSearch()

    const nextArrow = screen.getByLabelText('nextPage')
    const prevArrow = screen.getByLabelText('prevPage')

    await userEvent.click(nextArrow)

    await waitForElementToBeRemoved(() =>
      MOVIE_TITLES_PER_PAGE[1].map(movieTitle =>
        screen.getByText(movieTitle, { exact: true }),
      ),
    )

    MOVIE_TITLES_PER_PAGE[2].forEach(movieTitle => {
      expect(screen.getByText(movieTitle, { exact: true })).toBeVisible()
    })

    await userEvent.click(prevArrow)

    await waitForElementToBeRemoved(() =>
      MOVIE_TITLES_PER_PAGE[2].map(movieTitle =>
        screen.getByText(movieTitle, { exact: true }),
      ),
    )

    MOVIE_TITLES_PER_PAGE[1].forEach(movieTitle => {
      expect(screen.getByText(movieTitle, { exact: true })).toBeVisible()
    })
  })

  it.todo('prevent user from going to negative pages')

  it.todo('prevent user from going to pages with no results')

  it.todo('shows an error when no films are found')
})
