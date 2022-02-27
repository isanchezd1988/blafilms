import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

const SearchNav = ({ onClick, children }) => (
  <div onClick={onClick} className="chevron">
    {children}
  </div>
)

export const SearchNavPrev = props => (
  <SearchNav {...props}>
    <ChevronLeft />
  </SearchNav>
)

export const SearchNavNext = props => (
  <SearchNav {...props}>
    <ChevronRight />
  </SearchNav>
)
