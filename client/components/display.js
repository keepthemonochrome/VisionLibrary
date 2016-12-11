import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Styles from './Styles';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

require('es6-promise').polyfill();
require('isomorphic-fetch');


class ClickableGridTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { clicked: false }
	}

	handleClick(tile) {
		this.setState({ clicked: !this.state.clicked },()=> {
			if (this.state.clicked) {
				this.props.addElement(tile);
			} else {
				this.props.removeElement(tile);
			}			
		});		  
	}

	render() {
		let style = this.state.clicked ? Styles.selected : {};
		// console.log(this.state.clicked);
		return (
      <GridTile
        key = {this.props.tile}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        onClick={() => this.handleClick(this.props.tile)}
        style = {style}
      >
        <img src={this.props.src} />
      </GridTile>			
		);
		
	}
}

class Display extends React.Component {

	constructor(props) {
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
		    <GridList
		      cellHeight={180}
		      cols = {4}
		      style={Styles.gridList}
		    >
		      <Subheader>Search result</Subheader>
		      {Object.keys(this.props.sources).map((tile) => (
		        <ClickableGridTile
		          tile = {tile}
		          addElement = {this.addElement.bind(this)}
		          removeElement = {this.removeElement.bind(this)}
		          src={window.endpoint + '/photos/' + tile}
		        />
		      ))}
		    </GridList>
		  </div>
  	)
  }
}

module.exports = Display;
