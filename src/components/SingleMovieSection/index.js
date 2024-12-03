import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa6'

import Navbar from '../Navbar'

import CastCard from '../CastCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class SingleMovieSection extends Component {
  state = {singleMovieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getSingleMovieData()
  }

  getSingleMovieData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiKey = 'a887224060345fbb1b5c61d0b09bffff'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en`

    const response = await fetch(apiUrl)
    const singleMovieData = await response.json()
    console.log(singleMovieData)

    if (response.ok) {
      const updatedSingleMovieData = {
        id: singleMovieData.id,
        genres: singleMovieData.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        posterPath: singleMovieData.poster_path,
        overview: singleMovieData.overview,
        releaseDate: singleMovieData.release_date,
        runtime: singleMovieData.runtime,
        voteAverage: singleMovieData.vote_average,
        title: singleMovieData.title,
      }

      this.setState({
        singleMovieDetails: updatedSingleMovieData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {singleMovieDetails} = this.state
    console.log(singleMovieDetails)

    const {
      genres,
      posterPath,
      overview,
      releaseDate,
      runtime,
      voteAverage,
      title,
    } = singleMovieDetails
    const {match} = this.props
    const {params} = match
    const {id} = params
    const imgUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
    const genreNamesList = []
    genres.map(eachGenre => genreNamesList.push(eachGenre.name))

    const genreNames = genreNamesList.join(' . ')

    return (
      <div className="movie-bg-container">
        <div className="movie-details-container">
          <div className="movie-overview-container">
            <img src={imgUrl} className="movie-image" alt={title} />
            <div className="movie-details-text-container">
              <h1 className="movie-card-title">{title}</h1>
              <div className="movie-card-rating-container">
                <div className="movie-card-rating-text-container">
                  <FaStar className="movie-rating-star-icon" />
                  <p className="movie-rating-text">{Math.round(voteAverage)}</p>
                </div>
                <p className="movie-rating-text">{runtime}mins</p>
                <p className="movie-rating-text">{genreNames}</p>
              </div>
              <p className="movie-rating-text">{releaseDate}</p>
              <p className="movie-overview-text">{overview}</p>
            </div>
          </div>
        </div>
        <CastCard movieId={id} />
      </div>
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
    return (
      <>
        <Navbar />
        {this.renderStatusView()}
      </>
    )
  }
}

export default SingleMovieSection
