var React = require('react');

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDelete: []
		}
	}
  submitDelete() {
  	this.state.toDelete.forEach(source => {
  		this.props.handleDelete(source);
  	})
  }
  handleClick() {
  	
  }
  render() {
  	return (
      <div className = 'display-photos'>
        {
		  		 Object.keys(this.props.sources)
		  	  .map(source => (
		  		  <img 
		  		    className = 'display-photo'
		  		    scr = {source}
		  		    onClick = {this.handleClick.bind(this)}

		  		  />

		  	  ))
        }
        <div className = 'button' onClick = {this.submitDelete.bind(this)} />
      </div>

  		)


  }
}

var Display = ({handleDelete sources})

module.exports = Display;


