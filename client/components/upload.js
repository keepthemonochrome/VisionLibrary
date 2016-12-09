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
      open: false,
      formData: {}
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Rejected files: ', rejectedFiles);
    // Make a new formData object so simulate files being sent by a form
    // instead of an html5 dropzone
    var formData = new FormData();
    // Attach all accepted files to the form data
    _.each(acceptedFiles, file => formData.append('photos', file));
    this.setState({formData: formData})
  }
  handleOpen() {
    console.log('clicked open')
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleSubmit() {
    this.handleClose();
    console.log('triggering post request');
    fetch('http://localhost:3000/api/photos', {
      method: 'POST',
      body: this.state.formData
    })
    .then(response => console.log('Got response from server ', response))
    .catch(err => console.log('Error posting: ', err));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Upload Picture" onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="Load new pictures to server"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Dialog>
      </div>
    );
  }
}



module.exports = Upload;



