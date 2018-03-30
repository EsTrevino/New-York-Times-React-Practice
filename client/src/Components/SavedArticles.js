import React, { Component } from 'react';
import '../Assets/SavedArticles.css';
import SavedResults from './SavedResults.js';
import axios from 'axios';
import config from '../Utilities/Config.js';


class SavedArticles extends Component {
	constructor(props){
		super(props);

		this.state={
			savedData: ''
		}

		

	}

	componentWillMount() {
		// Make a request for a user with a given ID
			axios.get(`https://${config.url}/api/saved`)
			  .then(response => {
		//save and format data
			  	var savedArray = response.data;
		//update state with response data
			  	this.setState({savedData: savedArray}); 	
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		}

	displaySavedResults(){
		if(this.state.savedData instanceof Array){
			return this.state.savedData.map(function(object, i){
				return <div className="row savedResults col-12" key={i}> <SavedResults object={object} key={i} /> </div>;
			})
		}
	}
	
  render() {
    return (
        <div>
        	<div className="card">
				  <div className="card-header">
				    <h5><span><i className="fa fa-floppy-o" aria-hidden="true"></i></span> Saved Articles</h5>
				  </div>
				  <div className="card-body">
					{this.displaySavedResults()}
				  </div>
				
				</div>
        </div>
    );
  }
}

export default SavedArticles;