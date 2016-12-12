import React from 'react';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import assign from 'lodash/assign';
import Styles from './Styles';

class ClickableTile extends React.Component {
	constructor(props) {
		super(props);
		//props.keywords is the keywords
		this.state = {
			selected: false,
			canDoubleClick: false

		}
	}

	handleClick(uuid) {
		if (this.state.canDoubleClick) {
			this.onDoubleClick();
		} else {
			this.setState({
				selected: !this.state.selected,
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
		this.props.thumbDblClick('/api/photos/' + this.props.uuid);
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
			</div>
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
    var selectedElements = Object.keys(this.state.selectedElement);
    this.props.handleDelete(selectedElements);
   }
   
  addElement(uuid) {
    let selectedElement = this.state.selectedElement;
    selectedElement[uuid]= true;
    this.setState({selectedElement: selectedElement}, ()=>{
      console.log(this.state.selectedElement)
    });

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
					this.props.sources.map((p, idx) => {
						return (<ClickableTile
							key={p.uuid}
							src={'/api/photos/' + p.uuid + '-thumb'}
							uuid={p.uuid}

							thumbDblClick={src => this.props.thumbDblClick(idx, src, p.keywords)}
							addElement={this.addElement.bind(this)}
							removeElement={this.removeElement.bind(this)}
							/>);
					})
				}
			</section>
		  </div>
  	)
  }
}

module.exports = Display;
