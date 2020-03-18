import React, { Component } from 'react';

export default class UpdateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            review: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount(){
        if (this.props.storedMovies) {
            this.setState({
                author: this.props.storedMovies.author,
                review: this.props.storedMovies.review,
                id: this.props.storedMovies._id
            })
        }
    }
    render() {
        return(
            <div>
                <h1>Update Review</h1>
                <form onSubmit={(event)=> {this.props.updateReview(event, this.props.review); this.props.toggleForm()}}>
                <input type="text" placeholder="Review" name="review" onChange={this.handleChange} value={this.state.review}/>
                <input type="submit"/>
                </form>
            </div>
        )
    }
};
