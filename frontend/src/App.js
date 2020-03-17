import React from 'react';
import './css/bulma.min.css'
import './App.css';
import NavBar from './Components/Navbar.js'
import secret from './secret.js'
let baseURL = ''
if (process.env.NODE_ENV === 'development'){
  baseURL = secret.apikey
} else {
  baseURL = 'https://movie-critique.herokuapp.com/'
}
 export default class App extends React.Component{
   constructor(props){
     super(props)
     this.state = {
       externalMovies:[],
       storedMovies: []
     }
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this. handleQuery.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
   }
   componentDidMount(){

   }

   handleChange (event) {
     this.setState({ [event.currentTarget.id]: event.currentTarget.value})
   }
   async handleQuery (event) {
     event.preventDefault()
     try {
       let response = await fetch(`${baseURL + this.state.title}&page=1&include_adult=false`)
       let externalData = await response.json()
       this.setState({externalMovies: externalData})
     } catch (e) {
       console.error(e);
     }
   }
     async addMovie (i) {
    try{
      let response = await fetch('http://localhost:3003/reviews', {
        method: 'POST',
        body: JSON.stringify({
          title: this.state.externalMovies.results[i].title,
          release_date: this.state.externalMovies.results[i].release_date,
          // rated: this.state.externalMovies.results[i].rated,
          // genre: this.state.externalMovies.results[i].genre,
          director: this.state.externalMovies.results[i].director,
          // actors: this.state.externalMovies.results[i].actors,
          overview: this.state.externalMovies.results[i].overview,
          poster_path: this.state.externalMovies.results[i].poster_path,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      const myMovies = [data, ...this.state.storedMovies]
      this.setState({
        storedMovies: myMovies,
        title: '',
        released: '',
        rated: '',
        genre: '',
        director: '',
        actors : [],
        plot: '',
        poster: ''
      })
    }catch(e){
      console.error({'Error': e})
    }
  }
  async deleteMovie (id){
      try{
          let response = await fetch(baseURL + '/reviews/' + id, {
             method: 'DELETE'
         })
         let data = await response.json()
         const foundReview = this.state.reviews.findIndex(review =>
         review._id === id)
         const copyReviews = [...this.state.reviews]
         copyReviews.splice(foundReview, 1)
         this.setState({reviews: copyReviews})
     } catch(e){
         console.error(e);
     }
 }

render(){
  console.log(this.state.externalMovies.results)

  return(
    <>
    <NavBar />
    <div className="container">
    <h1 className="title is-1  level-item">Movie Critique</h1>

    <div className="tile is-ancestor notification level-item">

      <form onSubmit={this.handleQuery} >
        <div className="field">
        <label className="label"htmlFor="title"></label>
        <div className="control">
        <input className="input" placeholder="Movie title: Jaws, Shrek, Batman..." type="text" id="title" name="title" onChange={this.handleChange}/>
        </div>
        </div>
      <div>
      <input className="button is-primary "type="submit" value="Find Movie"/>
      </div>
      </form>
      </div>
      {this.state.externalMovies.length !== 0 ?
        <div>
          {this.state.externalMovies.results.map((movie, i) => {
            return (
              <li className="external-movie" key={i}>
              <img className="external-img is-one-quarter" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt=""/>
              <div>
              <h2 onClick={() => this.addMovie(i)} >{movie.title}</h2>
              <h4>{movie.release_date}</h4>
              </div>
              </li>
            )
            })
          }
        </div>
        : <div></div>
      }
      {this.state.storedMovies.length !== 0 ?
      <div><h3>I have movies</h3></div>
      :
      <div></div>
    }
    {console.log(this.state.storedMovies)}
    </div>
    </>
  )
}
}
