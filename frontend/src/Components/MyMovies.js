import React from 'react'

  export default class MyMovies extends React.Component {
    constructor(props) {
      super(props)

    }

    render(){
      return(
        <>
        {this.props.storedMovies.length === 0 ?
          <div><h2>You don't have any reviewed movies yet!</h2></div>
          :
          this.props.storedMovies.map((movie, i)=> {
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
