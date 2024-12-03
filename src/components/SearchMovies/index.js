import Navbar from '../Navbar'

import MovieCard from '../MovieCard'

import SearchContext from '../../context/SearchContext'

import Pagination from '../Pagination'

import './index.css'

const SearchMovies = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchMoviesList, getSearchMoviesData, totalPages} = value
      const isListEmpty = searchMoviesList.length === 0

      return (
        <div className="search-bg-container">
          <Navbar />
          {isListEmpty ? (
            <div className="emptyMovieListContainer">
              <img
                src="https://pixabay.com/get/g1ef2113ba7f125c927f279211b324fa2d3b3a903b7506b55bc2091c27ed2b91d3fa2829e4f677966647484f9e1013ec96770b62fa6bf5ed9180c18479a97b760a54d53c36736af6cab670fb4e454a232_1280.jpg?attachment="
                className="empty-list-image"
                alt="no movies"
              />
              <p className="empty-list-text">No Movies Found</p>
            </div>
          ) : (
            <>
              <ul className="search-page-container">
                {searchMoviesList.map(eachMovie => (
                  <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
                ))}
              </ul>
              <Pagination
                totalPages={totalPages}
                apiCallback={getSearchMoviesData}
              />
            </>
          )}
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default SearchMovies
