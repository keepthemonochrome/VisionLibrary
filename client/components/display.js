import React from 'react';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Styles from './Styles';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {assign} from 'lodash';
require('es6-promise').polyfill();
require('isomorphic-fetch');


class ClickableTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { clicked: false }
	}

	handleClick(uuid) {
		this.setState({ clicked: !this.state.clicked },()=> {
			if (this.state.clicked) {
				this.props.addElement(uuid);
			} else {
				this.props.removeElement(uuid);
			}
		});
	}

	render() {
		let style = this.state.clicked ?
			assign(Styles.imageSelect, Styles.image) : Styles.image;
		console.log(style);
		// console.log(this.state.clicked);
		return (
			<img
				src={this.props.src}
				style={style}
				onClick={this.handleClick.bind(this, this.props.uuid)} />
		);

	}
}

class Display extends React.Component {

	constructor(props) {
    props.loadAllPhoto();
		super(props);
		this.state = {
			selectedElement: {},
			display: 'display-photo',
		}
	}

  submitDelete() {
  	console.log('need to submit delete request to server for these photos');
  	console.log(this.state.selectedElement);

  }
  addElement(uuid) {
    let selectedElement = this.state.selectedElement;
    selectedElement[uuid]= true;
    this.setState({selectedElement: selectedElement});

  }
  removeElement(uuid) {
    let selectedElement = this.state.selectedElement;
    delete selectedElement[uuid];
    this.setState({selectedElement: selectedElement});
  }

  render() {
  	return (
		  <div style={Styles.root}>
        <FlatButton
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          label="Delete Selected Photos"
          style={Styles.deleteButton}
          onClick={this.submitDelete.bind(this)}
        />
			<Subheader>Search result</Subheader>
			<style>{'section::after {content:\'\'; flex-grow: 999999999}'}</style>
			<section style={{display: 'flex', flexWrap: 'wrap'}}>
				{
					Object.keys(this.props.sources).map((uuid) => {
						return (<ClickableTile src={'/api/photos/' + uuid} uuid={uuid} />);
					})
				}
			</section>
		  </div>
  	)
  }
}

module.exports = Display;
