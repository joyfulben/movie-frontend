import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
       this.handleQuery = this.handleQuery.bind(this)
    }
    async handleQuery (event) {
       event.preventDefault()
       try {
         let response = await fetch(`${this.props.baseURL}query=${this.state.title}&page=1&include_adult=false`)
         let externalData = await response.json()
         this.props.handleAddExternal(externalData)
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
          <div className="tile is-ancestor notification level-item">

          <form onSubmit={this.handleQuery} >
            <div className="field">
            <label className="label"htmlFor="title"></label>
            <div className="control">
            <input className="input" placeholder="Movie title: Jaws, Shrek, Batman..." type="text" id="title" name="title" onChange={this.handleChange}/>
            </div>
            </div>
          <div>
          <input className="button is-primary "type="submit" value="Find Movie"/>
          </div>
          </form>
        </div>


        )
    }
}
