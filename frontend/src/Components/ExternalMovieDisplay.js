import React, { Component } from 'react';

export default class MovieDisplay extends Component {
    constructor(props){
        super(props)
    }
    async addMovie (i) {
   try{
     let response = await fetch(this.props.extURL + '/reviews', {
       method: 'POST',
       body: JSON.stringify({
           title: this.props.externalMovies.results[i].title,
           release_date: this.props.externalMovies.results[i].release_date,
           overview: this.props.externalMovies.results[i].overview,
           poster_path: this.props.externalMovies.results[i].poster_path,
       }),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     let data = await response.json()
     this.props.handleAddInternal(data)
     this.setState({
       title: '',
       release_date: '',
       overview: '',
       poster_path: ''
     })
   }catch(e){
     console.error({'Error': e})
   }
 }

    render(){
        return(
          <>
          <div className="container">
          {this.props.externalMovies.length !== 0 ?
           <div className="wrapper">
             {this.props.externalMovies.results.map((movie, i) => {
               return (
                 <li className="movie" key={i}>
                 <img onClick={() => this.addMovie(i)} className="image" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt=""/>
                 <div className="movieText">
                 <h2  onClick={() => this.addMovie(i)} >{movie.title}</h2>
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
