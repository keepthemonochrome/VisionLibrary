var React = require('react');
var Dropzone = require('react-dropzone');
var ReactDOM = require('react-dom');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      keyword: '',
    }

  }
  handleChange(event) {
    this.setState({keyword: event.target.value});
  }  
  render() {
    return (
      <form onSubmit={() => {this.porps.handleSearch(this.state.keyword)}}>
        <label>
          Enter keyword:
          <input type="text" value={this.state.keyword} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" className = 'button' value="Submit" />
      </form>
    );
  }
}


module.exports = Nav;





