import React from 'react';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import * as _ from 'lodash';
import Styles from './Styles';
import FileList from './FileList';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      formData: {},
      fileNames: []
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Rejected files: ', rejectedFiles);
    // Make a new formData object to simulate files being sent by a form
    // instead of an html5 dropzone
    var formData = new FormData();
    // Attach all accepted files to the form data
    _.each(acceptedFiles, file => formData.append('photos', file));
    this.setState({ formData, fileNames: acceptedFiles.map(file => file.name) });
    console.log('sadfdsfa', acceptedFiles);
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
        <FlatButton
          icon={<FontIcon className="material-icons">backup</FontIcon>}
          label="Upload"
          style={Styles.uploadButton}
          onClick={this.handleOpen.bind(this)}
        />
        <Dialog
          title={Styles.uploadDialogTitle}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <div style={Styles.uploadContainer}>
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              style={Styles.dropzone}
              >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <div style={{overflow: 'auto'}}>
              <FileList fileNames={ this.state.fileNames } />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}



module.exports = Upload;
