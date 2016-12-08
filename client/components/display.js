var React = require('react');

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDelete: []
			display: 'display-photo'
		}
	}
  submitDelete() {
  	this.state.toDelete.forEach(source => {
  		this.props.handleDelete(source);
  	})
  }
  handleClick() {
    this.setState({display: 'display-photo to-delete'});
    console.log('should delete these files: ' + this.state.toDelete);
  }
  render() {
  	return (
      <div className = 'display-photos'>
        {
		  		 Object.keys(this.props.sources)
		  	  .map(source => (
		  		  <img 
		  		    className = {this.state.display}
		  		    src = {window.endpoint + '/photos/' + source}
		  		    onClick = {this.handleClick.bind(this)}

		  		  />

		  	  ))
        }
        <div 
          className = 'button' 
          onClick = {this.submitDelete.bind(this)} 
         > Submit Delete </div>
      </div>

  		)


  }
}


module.exports = Display;


