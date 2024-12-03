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

class Upcoming extends Component {
  state = {
    upcomingMoviesList: [],
    apiStatus: apiStatusConstants.initial,
    totalPages: 0,
  }

  componentDidMount() {
    this.getUpcomingMoviesData()
  }

  getUpcomingMoviesData = async (page = 1) => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiKey = 'a887224060345fbb1b5c61d0b09bffff'
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(upcomingMoviesURL)
    const upcomingMoviesData = await response.json()
    console.log(upcomingMoviesData)

    if (response.ok) {
      const upcomingMoviesListData = upcomingMoviesData.results.map(
        eachMovie => ({
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
        }),
      )

      this.setState({
        upcomingMoviesList: upcomingMoviesListData,
        totalPages: upcomingMoviesData.total_pages,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {upcomingMoviesList} = this.state
    console.log(upcomingMoviesList)

    return (
      <ul className="upcoming-container">
        {upcomingMoviesList.map(eachMovie => (
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
      <div className="upcoming-bg-container">
        <Navbar />
        {this.renderStatusView()}
        <Pagination
          totalPages={totalPages}
          apiCallback={this.getUpcomingMoviesData}
        />
      </div>
    )
  }
}

export default Upcoming
