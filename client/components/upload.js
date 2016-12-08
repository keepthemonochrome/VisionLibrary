var React = require('react');
var Dropzone = require('react-dropzone');
var ReactDOM = require('react-dom');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Upload extends React.Component {
  onDrop(acceptedFiles, rejectedFiles) {
  	console.log('Rejected files: ', rejectedFiles);
		console.log('Accepted files: ', acceptedFiles);
		var formData = new FormData();
		formData.append('photos', acceptedFiles);
		fetch('http://localhost:3000/api/photos', {
			method: 'POST',
			body: formData
		}).then(response => console.log('Got response from server ', response));
  }

  render() {
    return (
        <div>
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    );
  }
}

module.exports = Upload;



