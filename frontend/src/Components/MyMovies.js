import React from 'react'

  export default class MyMovies extends React.Component {
    constructor(props) {
      super(props)

    }

    async updateReview(event, review){
        event.preventDefault()
        try{
            let response = await fetch(`${this.props.extURL}/reviews/${review._id}`, {
                body: JSON.stringify(review),
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            let updatedReview = await response.json()
            this.props.updateReview(review._id)
        } catch(error){
            console.log(error);
        }
    }
    async deleteReview (id){
        try{
            let response = await fetch(this.props.extURL + '/reviews/' + id, {
               method: 'DELETE'
           })
           let data = await response.json()
           this.props.removeReview(data._id)
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
