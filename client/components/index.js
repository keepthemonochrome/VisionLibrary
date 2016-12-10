import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './nav';
import Display from './display';
import TagBar from './TagBar';
import Upload from './upload';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('es6-promise').polyfill();
require('isomorphic-fetch');
window.endpoint = 'http://localhost:3000/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {}
    }
  }

  handleSearch (keyword = '', limit = 10) {
    fetch(window.endpoint + '/photos/' + keyword, {method: 'GET'})
    .then(response =>  response.json())
    .then(json => {
      var result = json.reduce((result, element) => {
        result[element.uuid] = element.keywords;
        return result;
      },{});
      this.setState({sources: result})
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
            style={{backgroundColor: '#03A9F4'}}
            />
          <TagBar
            tags={['food', 'travel', 'animals']}
            style={{backgroundColor: 'rgb(245, 245, 245)'}}
            tagStyle={{marginRight: 10}}
            />

          <Display
            handleDelete = {this.handleDelete.bind(this)}
            sources = {this.state.sources}
          />
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
