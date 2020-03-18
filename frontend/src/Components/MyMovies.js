import UpdateForm from './UpdateForm.js'
import NewForm from './NewForm.js'


import React from 'react'
import MyMovie from './MyMovie'
  export default class MyMovies extends React.Component {
<<<<<<< HEAD
    constructor(props) {
      super(props)
      this.state = {
        author: '',
        review: '',
        showForm: false
      }
      this.toggleForm = this.toggleForm.bind(this)
      this.removeReview = this.removeReview.bind(this)
      this.updateReview = this.updateReview.bind(this)
    }
    toggleForm(){
       this.setState({showForm: !this.state.showForm})
    }
    async updateReview(event, id){
        event.preventDefault()
        try{
            let response = await fetch(this.props.extURL + '/reviews/' + id, {
                body: JSON.stringify(id),
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            let updatedReview = await response.json()
            this.props.updateReview(id)
        } catch(error){
            console.log(error);
        }
    }
    async removeReview (id){
        try{
            let response = await fetch(this.props.extURL + '/reviews/' + id, {
               method: 'DELETE'
           })
           let data = await response.json()
           this.props.removeReview(data._id)
           console.log(id);
       } catch(error){
           console.error(error);
       }
   }
=======


>>>>>>> aae40ae23964230363d70f3d721e3892c9907658
    render(){
      return(
        <>
        {this.props.storedMovies.length === 0 ?
          <div><h2>You don't have any reviewed movies yet!</h2></div>
          :
          this.props.storedMovies.map((movie, i)=> {
            return (
<<<<<<< HEAD
            <div>
              <img src={`${movie.poster_path}`} alt='' />
              <div>
                <h2>{movie.title}</h2>
                <h2>{movie.review}</h2>
                 {this.state.showForm ? <UpdateForm updateReview={this.updateReview} review={this.state.review} toggleForm={this.toggleForm}/> : <div></div>}
                 <h4 onClick={this.toggleForm}>Update</h4>
                 <button onClick={()=>this.removeReview(movie._id)}>X</button>
              </div>
            </div>
=======

            <MyMovie movie={movie} />
>>>>>>> aae40ae23964230363d70f3d721e3892c9907658


            )
          })
        }
        </>
      )
    }
  }
