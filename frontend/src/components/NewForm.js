import React, { Component } from 'react';

export default class NewForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            author: '',
            review: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={(event)=> this.props.addMovie(event,this.state)}>
                <input type="text" placeholder="author" name="author" value={this.state.author} onChange={this.handleChange}/>
                <input type="textarea" placeholder="review"  name="review" onChange={this.handleChange} value={this.state.review}/>
                <input type="submit"/>
                </form>
            </div>
        )
    }
}
