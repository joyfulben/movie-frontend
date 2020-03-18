import React from 'react'
import MyMovie from './MyMovie'
  export default class MyMovies extends React.Component {


    render(){
      return(
        <>
        {this.props.storedMovies.length === 0 ?
          <div><h2>You don't have any reviewed movies yet!</h2></div>
          :
          this.props.storedMovies.map((movie, i)=> {
            return (

            <MyMovie movie={movie} />


            )
          })
        }
        </>
      )
    }
  }
