import './index.css'

const CastItem = props => {
  const {castDetails} = props
  const {character, originalName, profilePath} = castDetails
  const profileImgUrl = `https://image.tmdb.org/t/p/w500/${profilePath}`

  return (
    <li className="cast-item">
      <img src={profileImgUrl} className="cast-img" alt={originalName} />
      <p className="cast-title">{character}</p>
      <p className="cast-title">{originalName}</p>
    </li>
  )
}

export default CastItem
