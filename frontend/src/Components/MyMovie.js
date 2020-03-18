import React from 'react'
export default class MyMovie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPlot: false
    }
    this.togglePlot = this.togglePlot.bind(this)
  }
  togglePlot () {
    this.setState({showPlot: !this.state.showPlot})
  }
  render() {
    return (
      <div className="my-movies">
        <div>
        <img src={`${this.props.movie.poster_path}`} alt='' />
        </div>
        <div>
          <div className="my-image ">
           <img  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.movie.poster_path}`} alt=""/>
          </div>
          <div className="">
            <h2>{this.props.movie.title}</h2>
            <button onClick={this.togglePlot}>Show Plot</button>
            {this.state.showPlot ?
            <p>{this.props.movie.overview}</p>
            : <p></p>
            }
          </div>
        </div>
      </div>
    )
  }
}
