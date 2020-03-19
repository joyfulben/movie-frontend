import UpdateForm from './UpdateForm.js'
import NewForm from './NewForm.js'


import React from 'react'
import MyMovie from './MyMovie'
  export default class MyMovies extends React.Component {
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
      this.handleChange = this.handleChange.bind(this)
    }
    toggleForm(){
       this.setState({showForm: !this.state.showForm})
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async updateReview(event, review){
        console.log(review);
        event.preventDefault()
        try{
            let response = await fetch(`${this.props.extURL}/reviews/${review.id}`, {
                body: JSON.stringify(review),
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            let updateReview = await response.json()
            this.props.updateReviewState(updateReview)
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
                <h2>{movie.review}</h2>
                 {this.state.showForm ? <UpdateForm storedMovie={this.props.storedMovies[i]} updateReview={this.updateReview} review={this.state.review} toggleForm={this.toggleForm}/> : <div></div>}
                 <h4 onClick={this.toggleForm}>Update</h4>
                 <button onClick={()=>this.removeReview(movie._id)}>X</button>
              </div>
            </div>


            )
          })
        }
        </>
      )
    }
  }
