import React, { Component } from 'react';

export default class NewForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            release_date: '',
            overview: '',
            poster_path: ''
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
                <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}/>
                <input type="text" placeholder="Release Date"  name="release_date" onChange={this.handleChange} value={this.state.release_date}/>
                <input type="text" placeholder="Plot"  name="overview" onChange={this.handleChange} value={this.state.overview}/>
                <input type="text" placeholder="Poster"  name="poster_path" onChange={this.handleChange} value={this.state.poster_path}/>
                <input type="submit"/>
                </form>
            </div>
        )
    }
}
