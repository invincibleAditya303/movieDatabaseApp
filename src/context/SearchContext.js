import {createContext} from 'react'

const SearchContext = createContext({
  searchText: '',
  searchMovie: '',
  totalPages: 0,
  onSearchMovies: () => {},
  onClickSearchMovies: () => {},
  getSearchMoviesData: () => {},
})

export default SearchContext
