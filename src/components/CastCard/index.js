import {Component} from 'react'

import CastItem from '../CastItem'

import './index.css'

class CastCard extends Component {
  state = {castList: []}

  componentDidMount() {
    this.getCastDetails()
  }

  getCastDetails = async () => {
    const apikey = 'a887224060345fbb1b5c61d0b09bffff'
    const {movieId} = this.props
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}&language=en-US`

    const response = await fetch(apiUrl)
    const castData = await response.json()
    console.log(castData)

    const castListData = castData.cast.map(eachCast => ({
      adult: eachCast.adult,
      castId: eachCast.cast_id,
      character: eachCast.character,
      creditId: eachCast.credit_id,
      gender: eachCast.gender,
      id: eachCast.id,
      knownForDepartment: eachCast.known_for_department,
      name: eachCast.name,
      order: eachCast.order,
      originalName: eachCast.original_name,
      popularity: eachCast.popularity,
      profilePath: eachCast.profile_path,
    }))

    this.setState({castList: castListData})
  }

  render() {
    const {castList} = this.state

    return (
      <ul className="cast-card-container">
        {castList.map(eachCast => (
          <CastItem castDetails={eachCast} key={eachCast.id} />
        ))}
      </ul>
    )
  }
}

export default CastCard
