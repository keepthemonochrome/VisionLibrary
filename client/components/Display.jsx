import React from 'react';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import assign from 'lodash/assign';
import Styles from './Styles';

class ClickableTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			open: false,
			canDoubleClick: false
		}
	}

	handleClick(uuid) {
		if (this.state.canDoubleClick) {
			this.onDoubleClick();
		} else {
			this.setState({
				selected: true,
				canDoubleClick: true,
			},
			() => {
				if (this.state.selected) {
					this.props.addElement(uuid);
				} else {
					this.props.removeElement(uuid);
				}
			});
			setTimeout(() => this.setState({canDoubleClick: false}), 500);
		}
	}

	onDoubleClick() {
		console.log('doubleclick detected');
		this.setState({ open: true });
	}

	render() {
		let style = this.state.selected ?
			assign(Styles.imageSelect, Styles.image) : Styles.image;
		return (
			<div style={Styles.imageCtr}>
				<div>
					<img
						src={this.props.src}
						onClick={this.handleClick.bind(this, this.props.uuid)}
						style={style} />
				</div>
				<Dialog
					open={this.state.open}
					contentStyle={ Styles.imageDialog }
					onRequestClose={this.setState.bind(this, {open: false})}>
					<div style={
							assign(Styles.imageDialogContainer,
								{ backgroundImage: `url(${'/api/photos/' + this.props.uuid})`}) }>
					</div>
				</Dialog>
			</div>
		);
		// <img src={d} style={Styles.bigImage} />

	}
}

class Display extends React.Component {

	constructor(props) {
    props.loadAllPhoto();
		super(props);
		this.state = {
			selectedElement: {},
			display: 'display-photo',
			sources: this.props.sources
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
						return (<ClickableTile
							key={uuid}
							src={'/api/photos/' + uuid + '-thumb'}
							uuid={uuid}
							/>);
					})
				}
			</section>
		  </div>
  	)
  }
}

module.exports = Display;
