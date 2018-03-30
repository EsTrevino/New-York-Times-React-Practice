import React, { Component } from 'react';



class SavedResults extends Component {

  render() {
    return (
        <div className="savedResults col-12">
				<div className="card text-center">
					  <div className="card-block">
					  	<h5>{this.props.object.title}</h5>
					    <p>{this.props.object.text}</p>
					    <p>{this.props.object.date}</p>
					    <a href={this.props.object.url} className="btn btn-primary">Go to Article</a>
					  </div>
				</div>
			</div>
    );
  }
}

export default SavedResults;