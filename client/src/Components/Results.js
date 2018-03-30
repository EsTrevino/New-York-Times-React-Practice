import React from 'react';
import axios from 'axios';
import moment from 'moment';
import config from '../Utilities/Config.js';
	
class Results extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		//format data
		var mainArticleTitle = this.props.object.headline.main;
		var articleText = this.props.object.snippet;
		var articleURL = this.props.object.web_url;
		var articleDate = this.props.object.pub_date;
		var formattedDate = moment(articleDate).format("MMMM Do YYYY");
		//save in object for req.body
		var saveInfo ={
			title: mainArticleTitle,
			text: articleText,
			date: formattedDate,
			url: articleURL
		};
		//make post call to api
		axios.post(`https://${config.url}/api/saved`, saveInfo)
		.then((response) =>{
			alert(`${mainArticleTitle} saved. Check Saved Articles to view`);
		})
		.catch(function (error){
			console.log(error);
		});

	};

	render(){
		var mainArticleTitle = this.props.object.headline.main;
		var articleText = this.props.object.snippet;
		var articleURL = this.props.object.web_url;
		var articleDate = this.props.object.pub_date;
		var formattedDate = moment(articleDate).format("MMMM Do YYYY");
	
		return(
			<div className="searchResults col-12">
				<div className="card text-center">
					 <div className="card-block">
					    <h5>{mainArticleTitle}</h5>
					 	<p className="card-text">{articleText}</p>
					 	 <p>Published on {formattedDate}</p>
					 	 <div className="row justify-content-center">
					 	 <a href={articleURL} className="btn btn-primary">Go to Article</a>
					    <button className="btn btn-success" onClick={this.handleClick}>Save Article</button>
					    </div>
					  </div>
				</div>
			</div>
						
	
		)
	}
}

export default Results;