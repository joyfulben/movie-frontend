import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props){
      super(props)
      this.state = {
        title: ''
      }
        this.handleChange = this.handleChange.bind(this)
       this.handleQuery = this.handleQuery.bind(this)
    }
    async handleQuery (event) {
       event.preventDefault()
       try {
         let response = await fetch(`${this.props.baseURL}query=${this.state.title}&page=1&include_adult=false`)
         let externalData = await response.json()
         this.props.handleAddExternal(externalData)
         this.setState({title: ""})
       } catch (e) {
         console.error(e);
       }
     }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
      return(
        <div className="container">

          <div className="title-search tile is-ancestor is-vertical notification level-item">
            <h1 className=" title is-1 level-item">Movie Critique</h1>
            <form className="tile is-parent level-item" onSubmit={this.handleQuery} >
              <div className="tile is-child is-parent field">
                <label className="label"htmlFor="title"></label>
                <div className="control tile is-parent level-item">
                  <div className="tile is-9">
                  <input className="input" placeholder="Movie title: Jaws, Shrek, Batman..." type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} required/>
                </div>
                <div className="tile is-child">
                  <input className="button is-primary "type="submit" value="Find Movie"/>
                </div>
              </div>
              </div>

            </form>
          </div>
        </div>

        )
    }
}
