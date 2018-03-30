import React, { Component } from 'react';
import Results from './Results.js';
import '../Assets/Search.css';
import axios from 'axios';
import moment from 'moment';

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var apiKey= "8927f2f8d877417ca2fb7cd88a9667ea";

class Search extends Component {
	constructor(props){
		super(props);
		//state
		this.state = {
			topic: '',
			startYear: '',
			endYear: '',
			data: ''
		};
		//this binding	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleChange(event){
	this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event){
			event.preventDefault();

			var submittedStartDate = this.state.startYear;
			var submittedEndDate = this.state.endYear;
			var formatStartDate = moment(submittedStartDate, "MM-DD-YYYY").format("YYYYMMDD");
			var formatEndDate = moment(submittedEndDate, "MM-DD-YYYY").format("YYYYMMDD");

			axios.get(url, {
		    params: {
		     	"api-key": apiKey,
		     	'q': `${this.state.topic}`,
		     	'begin_date': formatStartDate,
		     	'end_date': formatEndDate
		     	// 'q':"pokemon",
		     	// 'begin_date': "20170101",
		     	// 'end_date': "20171101"
		    }
		  }).then(response => {
		   //save and format response
		   var articleArray = response.data.response.docs;
		   //set state of data
		   this.setState({data: articleArray});
		   //log it to see what we get	
		  }).catch(function (error) {
		    console.log(error);
		  });
	}

	handleClear(event){
		event.preventDefault();
		console.log("clear button works");
	}

	displayResults(){
		if(this.state.data instanceof Array){
			return this.state.data.map(function(object, i){
				
				return <div className="row searchKey col-12" key={i}> <Results object={object} key={i} /> </div>;

			})
		}
	}

  render() {
    return (
        <div>

        <div className="card">
		  <div className="card-header">
		   <h5><span><i className="fa fa-list-alt" aria-hidden="true"></i></span> Search Parameters</h5>
		  </div>
		  <div className="card-body">
		  	<form onSubmit={this.handleSubmit}>
			  <div className="form-group">
			    <label>Topic:</label>
			    <input type="text" className="form-control" name="topic" value={this.state.topic} onChange={this.handleChange}></input>
			  </div>
			  <div className="form-group">
			    <label>Start Year(Required):</label>
			    <input type="text" className="form-control" name="startYear" value={this.state.startYear} onChange={this.handleChange} placeholder="MM-DD-YYYY"></input>
			  </div>
			  <div className="form-group">
			    <label>End Year(Required):</label>
			    <input type="text" className="form-control" name="endYear" value={this.state.endYear} onChange={this.handleChange} placeholder="MM-DD-YYYY"></input>
			  </div>
			 <button type="submit" value="submit" className="btn"><i className="fa fa-search" aria-hidden="true"></i> Submit</button>
			  <button onClick={this.getData} className="btn"> <i className="fa fa-trash-o" aria-hidden="true"></i> Clear Search</button> 
			</form>
		  
		  </div>
		</div>

		
			{this.state.data !== '' &&
			
				<div className="card resultContainer">
				  <div className="card-header">
				    <h5><span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span> Search Results</h5>
				  </div>
				  <div className="card-body">
				  {this.displayResults()}
				  </div>
				
				</div>
				
			}

	
        	
        </div>
		
		
    );
  }
}

export default Search;