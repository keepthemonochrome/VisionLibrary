var React = require('react');
var Dropzone = require('react-dropzone');
var ReactDOM = require('react-dom');
var Nav = require('./nav');
var Upload = require('./upload');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [{url: 'bonito.gif'}, {url: 'cat.jpg'}] //-------------------check with server
      
    }

  }

  handleSearch (keyword, limit = 10) {
    var requestBody = { //-------------------check with server
      keyword: keyword,
      limit: limit
      };
    fetch('http://localhost:3000/api/photos', {
      method: 'GET',
      body: requestBody, //----------------------------check with server
    }).then(response => {
      console.log('Got response from server ', response)
      this.setState({sources: response}) //----------------------------check with server
    });
  }
// <Display sources = {this.state.sources}/>

  render() {
    return (
        <div>
          <div> Home Page </div>
          <Nav 
            handleSearch = {this.handleSearch.bind(this)}
          />
          
          <Upload />
        </div>
    );
  }
}

window.App = App;

ReactDOM.render(
	<App />, 
	document.getElementById('app')
);



