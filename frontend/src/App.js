import React from 'react';
import './css/bulma.min.css'
import './css/App.css';
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
    this.handleQuery = this.handleQuery.bind(this)
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

  //    async addMovie () {
  //   try{
  //     let response = await fetch(baseURL + '/movies', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         title: this.state.externalMovies[i].title,
  //         released: this.state.externalMovies[i].released,
  //         rated: this.state.externalMovies[i].rated,
  //         genre: this.state.externalMovies[i].genre,
  //         director: this.state.externalMovies[i].director,
  //         actors: this.state.externalMovies[i].actors,
  //         plot: this.state.externalMovies[i].plot,
  //         poster: this.state.externalMovies[i].poster,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     let data = await response.json()
  //     const myMovies = [data, ...this.state.storedMovies]
  //     this.setState({
  //       storedMovies: myMovies,
  //       title: '',
  //       released: '',
  //       rated: '',
  //       genre: '',
  //       director: '',
  //       actors : [],
  //       plot: '',
  //       poster: ''
  //     })
  //   }catch(e){
  //     console.error({'Error': e})
  //   }
  // }

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
            console.log(movie)
            return (
              <li className="columns" key={i}>
              <img className="external-img is-square" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt=""/>
              <div>
              <h2 >{movie.title}</h2>
              <h4>{movie.release_date}</h4>
              </div>
              </li>
            )
          })
        }
        </div>
      : <div></div>
    }
    </div>
    </>
  )
}
}
