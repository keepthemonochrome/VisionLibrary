import React from 'react';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as _ from 'lodash';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Rejected files: ', rejectedFiles);
    // Make a new formData object so simulate files being sent by a form
    // instead of an html5 dropzone
    var formData = new FormData();
    // Attach all accepted files to the form data
    _.each(acceptedFiles, file => formData.append('photos', file));

    // Post files to server endpoint
    fetch('http://localhost:3000/api/photos', {
      method: 'POST',
      body: formData
    }).then(response => console.log('Got response from server ', response));
  }
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Dialog>
      </div>
    );
  }
}

module.exports = Upload;



