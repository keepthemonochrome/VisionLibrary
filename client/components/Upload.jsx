import React from 'react';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import each from 'lodash/each';

import FileList from './FileList';
import Styles from './Styles';

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.originalState = {
      open: false,
      formData: {},
      fileNames: []
    };
    this.state = this.originalState;
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // Make a new formData object to simulate files being sent by a form
    // instead of an html5 dropzone
    var formData = new FormData();
    // Attach all accepted files to the form data
    each(acceptedFiles, file => formData.append('photos', file));
    this.setState({ formData, fileNames: acceptedFiles.map(file => file.name) });
  }
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState(this.originalState);
  };

  handleSubmit() {
    this.setState({open: false});
    fetch('/api/photos', {
      method: 'POST',
      body: this.state.formData
    })
    .then(response => {
      console.log('Got response from server ', response);
      this.props.onUpload();
      this.setState(this.originalState);
    })
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
