import React from 'react';
import './css/bulma.min.css';
import './css/App.css';
import NavBar from './Components/Navbar.js'
import secret from './secret.js'
import UpdateForm from './Components/UpdateForm.js'
import NewForm from './Components/NewForm.js'
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
     this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
    this.updateReview = this.updateReview.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.addMovie = this.addMovie.bind(this)
   }
   componentDidMount(){
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
    handleChange (event) {
     this.setState({ [event.currentTarget.id]: event.currentTarget.value})
   }
     async addMovie (i) {
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
      const myMovies = [data, ...this.state.storedMovies]
      this.setState({
        storedMovies: myMovies,
        title: '',
        released: '',
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
         const foundReview = this.state.storedMovies.findIndex(review =>
         review._id === id)
         const copyReviews = [...this.state.storedMovies]
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
         {this.state.showForm ? <UpdateForm updateReview={this.state.updateReview} review={this.state.storedMovies} toggleForm={this.toggleForm}/> : <div></div>}
         <h4 onClick={this.toggleForm}>Update</h4>
         <button onClick={()=>this.state.deleteReview(this.state.storedMovies.id)}>X</button>
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
