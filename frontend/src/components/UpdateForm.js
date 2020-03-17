import React, { Component } from 'react';

export default class UpdateForm extends Component {
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
    componentDidMount(){
        if (this.props.storedMovies) {
            this.setState({
                title: this.props.storedMovies.title,
                release_date: this.props.storedMovies.release_date,
                overview: this.props.storedMovies.overview,
                poster_path: this.props.storedMovies.poster_path,
                id: this.props.storedMovies._id
            })
        }
    }
    render() {
        return(
            <div>
                <h1>Update Review</h1>
                <form onSubmit={(event)=> {this.props.updateReview(event, this.state); this.props.toggleForm()}}>
                <input type="text" placeholder="Title" name="title" onChange={this.handleChange} value={this.state.title}/>
                <input type="text" placeholder="Release Date"  name="release_date" onChange={this.handleChange} value={this.state.release_date}/>
                <input type="text" placeholder="Plot"  name="overview" onChange={this.handleChange} value={this.state.overview}/>
                <input type="text" placeholder="Poster"  name="poster_path" onChange={this.handleChange} value={this.state.poster_path}/>
                <input type="submit"/>
                </form>
            </div>
        )
    }
};
