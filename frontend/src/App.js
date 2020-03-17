import React from 'react';
import './css/bulma.min.css'
import './css/App.css';
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
              <NewForm addMovie={this.addMovie}/>
          {this.state.showForm ? <UpdateForm updateReview={this.state.updateReview} review={this.state.storedMovies} toggleForm={this.toggleForm}/> : <h1>{this.props.bookmark.url}>{this.props.bookmark.title}></h1>}
          <h4 onClick={this.toggleForm}>Update</h4>
          <button onClick={()=>this.state.deleteReview(storedMovies.id)}>X</button>
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
    </div>
    </>
  )}
}
