import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa6'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  const imgUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`

  return (
    <li className="movie-item">
      <img src={imgUrl} className="movie-img" alt={title} />
      <div className="rating-container">
        <FaStar className="star-icon" />
        <p className="rating-text">{Math.round(voteAverage)}</p>
      </div>
      <h1 className="movie-title">{title}</h1>
      <Link to={`/movie/${id}`}>
        <button className="view-button">View Details</button>
      </Link>
    </li>
  )
}

export default MovieCard
