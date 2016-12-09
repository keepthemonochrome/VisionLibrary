import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Display extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			toDelete: [],
			display: 'display-photo',
			styles: {
			  root: {
			    display: 'flex',
			    flexWrap: 'wrap',
			    justifyContent: 'space-around',
			  },
			  gridList: {
			    width: '90%',
			    height: 450,
			    overflowY: 'auto',
			  },				
			}			
		}
	}


  submitDelete() {
  	this.state.toDelete.forEach(source => {
  		this.props.handleDelete(source);
  	})
  }
  handleClick() {
    this.setState({display: 'display-photo to-delete'});
    console.log('should delete these files: ' + this.state.toDelete);
  }
		          // title='keyword1'
		          // subtitle='keyword2'
  render() {
  	return (
		  <div style={this.state.styles.root}>
		    <GridList
		      cellHeight={180}
		      cols = {4}
		      style={this.state.styles.gridList}
		    >
		      <Subheader>Search result</Subheader>
		      {Object.keys(this.props.sources).map((tile) => (
		        <GridTile
		          key={window.endpoint + '/photos/' + tile}
		          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
		        >
		          <img src={window.endpoint + '/photos/' + tile} />
		        </GridTile>
		      ))}
		    </GridList>
		  </div>
  	)
  }
}

module.exports = Display;





