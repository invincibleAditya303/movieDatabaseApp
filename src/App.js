import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'

import TopRated from './components/TopRated'

import Upcoming from './components/Upcoming'

import SingleMovieSection from './components/SingleMovieSection'

import SearchMovies from './components/SearchMovies'

import NotFound from './components/NotFound'

import SearchContext from './context/SearchContext'

import './App.css'

// write your code here
class App extends Component {
  state = {searchMoviesList: [], searchText: '', searchMovie: '', totalPages: 0}

  componentDidMount() {
    this.getSearchMoviesData()
  }

  getSearchMoviesData = async (page = 1) => {
    const {searchMovie} = this.state
    const apiKey = 'a887224060345fbb1b5c61d0b09bffff'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=${page}`
    const response = await fetch(apiUrl)
    const searchMoviesData = await response.json()
    console.log(searchMoviesData)

    const searchMoviesListData = searchMoviesData.results.map(eachMovie => ({
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
      searchMoviesList: searchMoviesListData,
      totalPages: searchMoviesData.totalPages,
    })
  }

  onSearchMovies = inputText => {
    this.setState({searchText: inputText})
  }

  onClickSearchMovies = () => {
    const {searchText} = this.state
    this.setState({searchMovie: searchText})
  }

  render() {
    const {searchMoviesList, searchText, searchMovie, totalPages} = this.state
    console.log(searchText)
    console.log(searchMovie)
    console.log(searchMoviesList)

    return (
      <SearchContext.Provider
        value={{
          searchMoviesList,
          searchText,
          searchMovie,
          totalPages,
          onSearchMovies: this.onSearchMovies,
          onClickSearchMovies: this.onClickSearchMovies,
          getSearchMoviesData: this.getSearchMoviesData,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={SingleMovieSection} />
          <Route exact path="/search/movie" component={SearchMovies} />
          <Route component={NotFound} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
