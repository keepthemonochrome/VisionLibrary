import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';
import uniq from 'lodash/uniq';

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
      relatedKeywords: [],
      bigImageSrc: '',
      bigImageIdx: 0,
      bigImageKeywords: [],
      bigImageOpen: false,
      bigImageMetaData: {},

    }
    this.fetchTopKeywords();
  }

  fetchTopKeywords() {
    fetch('/api/keywords')
      .then(res => res.json())
      .then(keywords => {
        let relatedKeywords = flow([
          sortBy([k => k.photoUUIDs.length]),
          map('keyword'),
          ks => ks.slice(0, 7)
        ]) (keywords);
        this.setState({
          autoCompleteData: map('keyword', keywords),
          relatedKeywords});
      });
  }

  fetchRelatedKeywords(searchKeyword) {
    fetch('api/keywords/' + searchKeyword)
    .then(res => res.json())
    .then(kwObj => {
      let relatedKeywords = [];
      kwObj.photoUUIDs.forEach(targetPhoto => {
        this.state.photosUUIDsToDisplay.forEach(uuid => {
          this.state.sources.forEach(obj => {
            if(obj.uuid === uuid) {
              relatedKeywords = relatedKeywords.concat(obj.keywords);
            }
          });
        });
        relatedKeywords = uniq(relatedKeywords);
        this.setState({relatedKeywords});
      });
    });
  }

  loadAllPhoto () {
    console.log('loadallphoto')
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

  handleDelete (sources) {
    let promises = sources.map(source =>
      fetch('/api/photos/delete/' + source, {method: 'POST'}));

    Promise.all(promises).then(() => {
      this.loadAllPhoto();
      setTimeout(this.fetchTopKeywords.bind(this), 1500);
    });
    // sources.forEach(source => {
    //   var modifiedState = this.state.photosUUIDsToDisplay;
    //   modifiedState =modifiedState.delete(source);
    //   this.setState(this.photosUUIDsToDisplay: modifiedState);
    // });

  }

  onThumbDblClick(bigImageIdx, bigImageSrc, bigImageKeywords) {
    this.setState({
      bigImageSrc,
      bigImageIdx,
      bigImageKeywords
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
      let bigImageKeywords = this.state.sources[imageIdxToSwitch].keywords;
      this.setState({
        bigImageIdx: imageIdxToSwitch,
        bigImageSrc,
        bigImageKeywords,
      },() => {
      fetch('/api/metadata/' + this.state.bigImageSrc.split('/').pop())
      .then(res => res.json())
      .then(result => {
        var metaDataObj = JSON.parse(result.metaData)
        this.setState({ bigImageMetaData: metaDataObj, bigImageOpen: false }, () => {
          this.setState({bigImageOpen: true});
        });
      })
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
            handleSearch={this.handleSearch.bind(this)}
            loadAllPhoto={this.loadAllPhoto.bind(this)}
            fetchTopKeywords={this.fetchTopKeywords.bind(this)}
            fetchRelatedKeywords={this.fetchRelatedKeywords.bind(this)}
            style={{backgroundColor: '#800080'}}
            autoCompleteData={this.state.autoCompleteData}
            onUpload={this.loadAllPhoto.bind(this)}
            />
          {this.state.bigImageOpen ?
            this.renderBigImageView() : this.renderDisplay() }
        </div>
      </MuiThemeProvider>
    );
  }

  renderBigImageView() {
    return (
      <BigImageView
        src={ this.state.bigImageSrc }
        keywords={ this.state.bigImageKeywords}
        metaDataObj={ this.state.bigImageMetaData }

      />
    );
  }

  renderDisplay() {
    return (
      <section>
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
