import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import MovieCard from '../MovieCard'

import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TopRated extends Component {
  state = {
    topMoviesList: [],
    apiStatus: apiStatusConstants.initial,
    totalPages: 0,
  }

  componentDidMount() {
    this.getTopMoviesData()
  }

  getTopMoviesData = async (page = 1) => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiKey = 'a887224060345fbb1b5c61d0b09bffff'
    const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(topRatedMoviesURL)
    const topMoviesData = await response.json()
    console.log(topMoviesData)

    if (response.ok) {
      const topMoviesListData = topMoviesData.results.map(eachMovie => ({
        adult: eachMovie.adult,
        backdropPath: eachMovie.backdrop_path,
        genreIds: eachMovie.genre_ids,
        id: eachMovie.id,
        originalLanguage: eachMovie.original_language,
        originalTitle: eachMovie.original_title,
        overview: eachMovie.overview,
        popularity: eachMovie.popularity,
        posterPath: eachMovie.poster_path,
        releaseDate: eachMovie.release_date,
        title: eachMovie.title,
        video: eachMovie.video,
        voteAverage: eachMovie.vote_average,
        voteCount: eachMovie.vote_count,
      }))

      this.setState({
        topMoviesList: topMoviesListData,
        totalPages: topMoviesData.total_pages,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {topMoviesList} = this.state
    console.log(topMoviesList)

    return (
      <ul className="top-rated-container">
        {topMoviesList.map(eachMovie => (
          <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="movies-section-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="movies-section-failure-view-img"
      />
      <h1 className="movies-section-failure-heading">
        Oops! Something went Wrong
      </h1>
      <p className="movies-section-failure-text">
        We cannot seem to find the page you looking for
      </p>
      <button
        type="button"
        className="movies-section-retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        null
    }
  }

  render() {
    const {totalPages} = this.state
    return (
      <div className="top-rated-bg-container">
        <Navbar />
        {this.renderStatusView()}
        <Pagination
          totalPages={totalPages}
          apiCallback={this.getTopMoviesData}
        />
      </div>
    )
  }
}

export default TopRated
