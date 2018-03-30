import React from 'react';
import '../Assets/Footer.css';
import 'font-awesome/css/font-awesome.min.css';

class Footer extends React.Component{
	render(){
		return(
			<div className="footer">
			      <div className="row footer-top">
				        	<ul>
					        	<li>
					        	<a href="https://www.linkedin.com/in/esteban-trevino-711966138/"><i className="fa fa-linkedin fa-2x" aria-hidden="true" ></i></a>
					        	</li>
					        	<li>
					        	<a href="https://github.com/etrevino7607"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
					          	</li>
				          	</ul>	       
			       </div>
			       <div className="row">
			        		 <div className="footer-copyright">
			            			<p>© Esteban Trevino 2017</p>	
			    			</div>
			       </div>	
		</div>
		)
	}
}

export default Footer;
