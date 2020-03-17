import React from 'react';
import './App.css';
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
       externalMovies: [],
       storedMovies: []
     }
    this.getMovies = this.getMovies.bind(this)
   }
   componentDidMount(){
     this.getMovies()
   }
   async getMovies() {
     try {
       let response = await fetch(`${baseURL}`)
       let externalData = await response.json()
       this.setState({externalMovies: externalData})
     } catch (e) {
       console.error(e);
     }
   }
     async addMovie () {
    try{
      let response = await fetch(baseURL + '/movies', {
        method: 'POST',
        body: JSON.stringify({
          title: this.state.movieExternal[i].title,
          released: this.state.movieExternal[i].released,
          rated: this.state.movieExternal[i].rated,
          genre: this.state.movieExternal[i].genre,
          director: this.state.movieExternal[i].director,
          actors: this.state.movieExternal[i].actors,
          plot: this.state.movieExternal[i].plot,
          poster: this.state.movieExternal[i].poster,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      const myMovies = [data, ...this.state.myMovieList]
      this.setState({
        myMovieList: myMovies,
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
  return(
    <>
    <h1>Movie Critique</h1>
    <div>
      <h2>{this.state.externalMovies.Title}</h2>
      <img src={`${this.state.externalMovies.Poster}`} />
    </div>
    </>
  )
}
