var React = require('react');
var Dropzone = require('react-dropzone');
var ReactDOM = require('react-dom');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Upload extends React.Component {
  onDrop(acceptedFiles, rejectedFiles) {
  	console.log('Rejected files: ', rejectedFiles);
        // var req = request.post('http://localhost:3000/api/photos');
        // acceptedFiles.forEach((file)=> {
        //     req.attach(file.name, file);
        // });

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
ReactDOM.render(
	<Upload />, 
	document.getElementById('app')
);



