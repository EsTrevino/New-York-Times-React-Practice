import React, { Component } from 'react';
import '../Assets/Header.css';
var Link = require('react-router-dom').Link;



class Header extends Component {
  render() {
    return (
        <div className="jumbotron">
        	<h1><span><i className="fa fa-newspaper-o" aria-hidden="true"></i></span> New York Times Article Search</h1>
        	<Link className='btn' to="/">Search</Link> <Link className='btn' to="/saved">Saved Articles</Link>

        </div>
    );
  }
}

export default Header;
