import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './css/bulma.min.css';
import './css/App.css';
import secret from './secret.js'
import MyMovies from './Components/MyMovies.js'
import UpdateForm from './Components/UpdateForm.js'
import NewForm from './Components/NewForm.js'
import NavBar from './Components/Navbar'

import SearchBar from './Components/SearchBar'
import MovieDisplay from './Components/ExternalMovieDisplay.js'
let baseURL = ''
let extURL = ''
if (process.env.NODE_ENV === 'development'){
  baseURL = secret.apikey
  extURL = secret.extkey
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
    this.updateReview = this.updateReview.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.handleAddExternal = this.handleAddExternal.bind(this)
    this.handleAddInternal = this.handleAddInternal.bind(this)
    this.getSavedMovies = this.getSavedMovies.bind(this)
   }
   componentDidMount(){
     this.getSavedMovies()

   }
   async getSavedMovies(){
     try {
       let response = await fetch(extURL + '/reviews')
       let InternalData = await response.json()
       this.setState({storedMovies: InternalData})
     } catch (e) {
       console.error(e);
     }
   }
   async handleAddExternal(movie){
     try {
       console.log(movie);
       let updatedMovieList = movie
       this.setState({externalMovies: updatedMovieList})
     } catch (e) {
       console.error(e);
     }
   }
   async handleAddInternal(movie){
     console.log(movie);
     let updatedSavedList = [movie, ...this.state.storedMovies]
     this.setState({storedMovies: updatedSavedList})
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
    <>
<Router>
  <div>
    <NavBar />
    <Route exact path='/my_movies' component={() => <MyMovies storedMovies={this.state.storedMovies}
      />} />
    <Route path='/new' exact component={NewForm} />
    <Route exact path='/' component={() => <><SearchBar handleAddExternal={this.handleAddExternal} baseURL={baseURL} /><MovieDisplay externalMovies={this.state.externalMovies} extURL={extURL} handleAddInternal={this.handleAddInternal} /> </>
          } />
  </div>
    </Router>
   </>
 )}
}
