import React from 'react';
import logo from './logo.svg';
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


}
