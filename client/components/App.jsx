import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';

import Nav from './Nav';
import Display from './Display';
import TagBar from './TagBar';
import Upload from './Upload';

window.endpoint = 'http://localhost:3000/api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {},
      autoCompleteData: [],
      topEightKeywords: []
    }
    this.fetchKeywords();
  }

  fetchKeywords() {
    fetch('/api/keywords')
      .then(res => res.json())
      .then(keywords => {
        let topEightKeywords = flow([
          sortBy([k => k.photoUUIDs.length]),
          map('keyword'),
          ks => ks.slice(0, 7)
        ]) (keywords);
        this.setState({
          autoCompleteData: map('keyword', keywords),
          topEightKeywords});
      });
  }

  loadAllPhoto () {
    fetch(window.endpoint + '/photos', {method: 'GET'})
      .then(response =>  response.json())
      .then(json => {
        var result = json.reduce((result, element) => {
          result[element.uuid] = element.keywords;
          return result;
        },{});
        this.setState({sources: result})
      });
  }

  handleSearch (keyword = '', limit = 10) {
    fetch(window.endpoint + '/keywords/' + keyword, {method: 'GET'})
    .then(response =>  response.json())
    .then(json => {
      var result = json.photoUUIDs.reduce((result, element) => {
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
            autoCompleteData={this.state.autoCompleteData}
            />
          <TagBar
            tags={this.state.topEightKeywords}
            style={{backgroundColor: 'rgb(245, 245, 245)'}}
            tagStyle={{marginRight: 10}}
            />
          <Display
            loadAllPhoto = {this.loadAllPhoto.bind(this)}
            handleDelete = {this.handleDelete.bind(this)}
            sources = {this.state.sources}
            />

          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

// <Router history={hashHistory}>
//   <Route path='/' component={App} />
// </Router>
