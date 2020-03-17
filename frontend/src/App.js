import React from 'react';
import './css/bulma.min.css'
import './App.css';
import secret from './secret.js'
import UpdateForm from './components/UpdateForm.js'
import NewForm from './components/NewForm.js'
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
       storedMovies: [],
       showForm: false
     }
    this.getMovies = this.getMovies.bind(this)
    this.updateReview = this.updateReview.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
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
            title: this.state.externalMovies.results[i].title,
            release_date: this.state.externalMovies.results[i].release_date,
            overview: this.state.externalMovies.results[i].overview,
            poster_path: this.state.externalMovies.results[i].poster_path,
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
  async updateReview(event, review){
      event.preventDefault()
      try{
          let response = await fetch(`${baseURL}/reviews/${review._id}`, {
              body: JSON.stringify(review),
              method: 'PUT',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              }
          })
          let updatedReview = await response.json()
          const foundReviewIndex = this.state.storedMovies.findIndex(foundReview => foundReview._id === review._id)
          const copyReviews = [...this.state.storedMovies]
          copyReviews[foundReviewIndex] = updatedReview
          this.setState({
              reviews: copyReviews
          })
      } catch(error){
          console.log(error);
      }
  }
  async deleteReview (id){
      try{
          let response = await fetch(baseURL + '/reviews/' + id, {
             method: 'DELETE'
         })
         let data = await response.json()
         const foundReview = this.state.storedMoviess.findIndex(review =>
         review._id === id)
         const copyReviews = [...this.state.storedMoviess]
         copyReviews.splice(foundReview, 1)
         this.setState({reviews: copyReviews})
     } catch(error){
         console.error(error);
     }
 }

 toggleForm(){
    this.setState({showForm: !this.state.showForm})
  }

render(){
  return(
    <div>
        <h1>Movie Critique</h1>
         <NewForm addMovie={this.addMovie}/>
          // <h2>{this.state.externalMovies.Title}</h2>
          // <img src={`${this.state.externalMovies.Poster}`} />
          {this.state.showForm ? <UpdateForm updateReview={this.state.updateReview} review={this.state.storedMovies} toggleForm={this.toggleForm}/> : <h1>{this.props.bookmark.url}>{this.props.bookmark.title}></h1>}
          <h4 onClick={this.toggleForm}>Update</h4>
          <button onClick={()=>this.state.deleteReview(storedMovies.id)}>X</button>
    </div>
  )}
}
