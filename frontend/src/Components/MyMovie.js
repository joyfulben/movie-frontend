import React from 'react'
import UpdateForm from './UpdateForm.js'
import StarRatingComponent from 'react-star-rating-component'


export default class MyMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlot: false,
      review: '',
      showForm: false,
      showPlot: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.removeReview = this.removeReview.bind(this)
    this.updateReview = this.updateReview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.togglePlot = this.togglePlot.bind(this)
    }
    toggleForm(){
     this.setState({showForm: !this.state.showForm})
    }
    handleChange(event){
      this.setState({
          [event.target.name]: event.target.value
      })
    }
    togglePlot () {
      this.setState({showPlot: !this.state.showPlot})
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
  const { rating } = this.state;
    return(
      <>
          <div className="my-movie">
            <img className="my-image" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`} alt=""/>
            <div>
              <h2>{this.props.movie.title}</h2>
              <h2>{this.props.movie.review}</h2>
               {this.state.showForm
                 ? <UpdateForm storedMovie={this.props.storedMovies[this.props.i]} updateReview={this.updateReview} review={this.state.review} toggleForm={this.toggleForm}/>
                 : <div></div>}

               <button onClick={this.toggleForm}>Create Review</button> <br/>
               <div className="my-plot">
               <button onClick={this.togglePlot}>Plot Summary</button>
               <button onClick={()=>this.removeReview(this.props.movie._id)}>X</button>
               </div>
               {this.state.showPlot ?
                 <p className="my-text">{this.props.movie.overview}</p> :
                 null
               }


            </div>
          </div>
      </>
    )
  }
 }
