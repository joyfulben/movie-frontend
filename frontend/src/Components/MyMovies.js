import React from 'react'

  export default class MyMovies extends React.Component {
    render(){
      return(
        <>
        {this.props.reviewedMovies.length === 0 ?
          <div><h2>You don't have any reviewed movies yet!</h2></div>
          : this.props.reviewedMovies.map((movie, i)=> {
            return (
              <div>
                <img src={`${movie.poster_path}`} alt='' />
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                </div>
              </div>
            )
          })
        }
        </>
      )
    }
  }
