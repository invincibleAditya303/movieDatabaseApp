import {Link, withRouter} from 'react-router-dom'

import SearchContext from '../../context/SearchContext'

import './index.css'

const Navbar = props => (
  <SearchContext.Consumer>
    {value => {
      const {searchText, onSearchMovies, onClickSearchMovies} = value

      const onSearch = event => onSearchMovies(event.target.value)
      const onClickSearch = () => {
        const {history} = props
        history.push('/search/movie')
        onClickSearchMovies()
      }

      return (
        <div className="navbar-bg-container">
          <h1 className="website-title">movieDB</h1>
          <div className="links-container">
            <Link to="/">
              <h1 className="link-button">Popular</h1>
            </Link>
            <Link to="/top-rated">
              <h1 className="link-button">Top Rated</h1>
            </Link>
            <Link to="/upcoming">
              <h1 className="link-button">Upcoming</h1>
            </Link>
            <div className="search-container">
              <input
                type="search"
                className="search-text"
                value={searchText}
                placeholder="Search"
                onChange={onSearch}
              />
              <button
                className="search-button"
                type="button"
                onClick={onClickSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default withRouter(Navbar)
