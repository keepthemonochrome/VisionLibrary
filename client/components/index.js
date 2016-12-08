var React = require('react');
var Dropzone = require('react-dropzone');
var ReactDOM = require('react-dom');
var _ = require('lodash');

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Upload extends React.Component {
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
ReactDOM.render(
	<Upload />,
	document.getElementById('app')
);
