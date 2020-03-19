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
        console.log(this.props.storedMovie);
        if (this.props.storedMovie) {
            this.setState({
                author: '',
                review: '',
                id: this.props.storedMovie._id
            })
        }
    }
    render() {
        console.log(this.state);
        return(
            <div>
                <h1>My Review</h1>
                <form onSubmit={(event)=> {this.props.updateReview(event, this.state); this.props.toggleForm()}}>
                <textarea class="textarea" rows="5" name="review" id="review" onChange={this.handleChange} value={this.state.review}></textarea>
                <input type="submit"/>
                </form>
            </div>
        )
    }
};
