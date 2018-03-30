import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import SearchContainer from './SearchContainer.js';
import SavedArticles from "./SavedArticles.js";

var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

class App extends Component {
  render() {
    return (
      <div>
      <Router>
      	<div className="container">
        <Header />
            <Switch>
              <Route exact path='/' component={SearchContainer} />
              <Route exact path='/saved' component={SavedArticles} />
              <Route render={function() {
                return <p>Route Not Found....</p>
              }} />
            </Switch>
        <Footer />
      	</div>
      </Router>
        
      </div>
    );
  }
}

export default App;
