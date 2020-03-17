import React from 'react'

  export default class NavBar extends React.Component {
    render(){
      return(
        <nav className="level has-background-light">
        <h2 className="level-item has-text-centered">Home</h2>
        <h2 className="level-item has-text-centered">My Movies</h2>
        <h2 className="level-item has-text-centered">Sign Up</h2>
        <h2 className="level-item has-text-centered">Log In</h2>
        </nav>
      )
    }
  }
