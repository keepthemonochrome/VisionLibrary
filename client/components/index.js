import React from 'react';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('es6-promise').polyfill();
require('isomorphic-fetch');
window.endpoint = 'http://localhost:3000/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {
        '40a59520-ce57-4b28-9141-03993f30408e': true,
        '188d5ca1-b238-40f1-a1a6-91979e8491a9': true,
        '302e5b16-4ac3-4966-a1bf-1146dd332b2b': true,
        '5977a69e-cc41-4a50-afc4-d3d6562bcc36': true,
        '8760fe44-3e7a-49e5-be5a-69c0321a65f3': true,
        '8986f048-9932-436a-a60c-cd7754df20a0': true,
        'ba0c8084-e538-4a3b-9545-930e9e378e5b': true,
        'c8a729c5-e6df-4653-9b4f-e0f944910295': true,
        'cffca93f-d4a4-44ed-b4c8-eef160fc8184': true,
//        {url: 'http://localhost:3000/api/photos/d34cdb08-385d-44fa-9c10-11929882cbba'},
      }, //-------------------check with server

    }

  }

  handleSearch (keyword, limit = 10) {
    fetch(window.endpoint + '/keywords/' + keyword, {method: 'GET'})
    .then(response => {
      console.log('Got response from server ', response)
      this.setState({sources: response}) //----------------------------check with server
    });
  }
  handleDelete (source) {
    delete this.state.sources[source]
    this.setState({sources: this.state.sources});
    fetch(window.endpoint + '/phones/delete/' + source, {method: 'POST'})
    .then(response => {
      console.log('Deleted one picture, response from server: ' + response);
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav
            handleSearch = {this.handleSearch.bind(this)}
          />
          <Display
            handleDelete = {this.handleDelete.bind(this)}
            sources = {this.state.sources}
          />
          <Upload />
        </div>
      </MuiThemeProvider>
    );
  }
}


window.App = App;

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
