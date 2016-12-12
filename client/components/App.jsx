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
import BigImageView from './BigImageView';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    window.addEventListener('keyup', (e) => {
      this.state.bigImageOpen && this.onDisplayKeyPress(e);
    });

    this.state = {
      sources: [],
      photosUUIDsToDisplay: new Set(),
      autoCompleteData: [],
      topEightKeywords: [],
      bigImageSrc: '',
      bigImageIdx: 0,
      bigImageOpen: false,
      bigImageMetaData: {}
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
    fetch('/api/photos', {method: 'GET'})
      .then(response =>  response.json())
      .then(sources => {
        let photosUUIDsToDisplay = new Set(sources.map(p => p.uuid));
        this.setState({ sources, photosUUIDsToDisplay });
      });
  }

  handleSearch (keyword='', limit = 10) {
    fetch('/api/keywords/' + keyword, {method: 'GET'})
    .then(response =>  response.json())
    .then(json => {
      // Store photo uuids in set data structure for faster lookup
      let photosUUIDsToDisplay = new Set(json.photoUUIDs.map(puuid => puuid.uuid));
      this.setState({ photosUUIDsToDisplay });
    });
  }

  // TODO change sources to array
  handleDelete (source) {
    // delete this.state.sources[source]
    // this.setState({sources: this.state.sources});
    // fetch('/api/phones/delete/' + source, {method: 'POST'})
    //   .then(response => {
    //     console.log('Deleted one picture, response from server: ' + response);
    //   })

    console.warn('handleDelete needs to be reimplemented');
  }

  onThumbDblClick(bigImageIdx, bigImageSrc) {
    this.setState({
      bigImageSrc,
      bigImageIdx,
    }, () => {
      fetch('/api/metadata/' + this.state.bigImageSrc.split('/').pop())
      .then(res => res.json())
      .then(result => {
        var metaDataObj = JSON.parse(result.metaData)
        this.setState({ bigImageMetaData: metaDataObj }, () => {
          this.setState({bigImageOpen: true});
        });
      })
    });
  }

  skipUpDisplayImage(deltaIdx) {
    let imageIdxToSwitch = this.state.bigImageIdx + deltaIdx;
    if (imageIdxToSwitch >= 0 && imageIdxToSwitch < this.state.sources.length) {
      let bigImageSrc = this.state.sources[imageIdxToSwitch].url;
      console.log(bigImageSrc);
      this.setState({
        bigImageIdx: imageIdxToSwitch,
        bigImageSrc,
      });
    }
  }

  onDisplayKeyPress(e) {
    // Make a hashmap from event strings to functions that act for that event
    let keyMap = {
      ArrowLeft: () => this.skipUpDisplayImage(-1),
      ArrowRight: () => this.skipUpDisplayImage(1),
      Escape: () => this.setState({ bigImageOpen: false }),
    };
    // Check if a function for that the event key exists and call it if so
    keyMap[e.key] && keyMap[e.key]();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className='stretch'>
          <Nav
            handleSearch = {this.handleSearch.bind(this)}
            loadAllPhoto = {this.loadAllPhoto.bind(this)}
            style={{backgroundColor: '#03A9F4'}}
            autoCompleteData={this.state.autoCompleteData}
            />
          {this.state.bigImageOpen ?
            this.renderBigImageView() : this.renderDisplay() }
        </div>
      </MuiThemeProvider>
    );
  }

  renderBigImageView() {
    console.log(this.state.bigImageSrc);
    console.log(this.state.bigImageMetaData);
    return (
      <BigImageView
        src={ this.state.bigImageSrc }
        metaDataObj={ this.state.bigImageMetaData }
      />
    );
  }

  renderDisplay() {
    return (
      <section>
        <TagBar
          tags={this.state.topEightKeywords}
          style={{backgroundColor: 'rgb(245, 245, 245)'}}
          tagStyle={{marginRight: 10}}
          />
        <Display
        loadAllPhoto={ this.loadAllPhoto.bind(this) }
        handleDelete={ this.handleDelete.bind(this) }
        thumbDblClick={ this.onThumbDblClick.bind(this) }
        sources={
          this.state.sources.filter(p =>
            this.state.photosUUIDsToDisplay.has(p.uuid))
        }
        />
    </section>);
  }
}
