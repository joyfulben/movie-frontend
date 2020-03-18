import React from 'react'
import {Link} from 'react-router-dom'

  export default class NavBar extends React.Component {
    render(){
      return(
        <nav className="level has-background-light">
        <h2 className="level-item has-text-centered">Home</h2>
        <Link to="/my_movies" className="level-item has-text-centered">My Movies</Link>
        <h2 className="level-item has-text-centered">Sign Up</h2>
        <h2 className="level-item has-text-centered">Log In</h2>
        </nav>
      )
    }
  }
