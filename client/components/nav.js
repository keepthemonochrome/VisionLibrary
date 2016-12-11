import React from 'react';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Upload from './upload.js';
import Styles from './Styles'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Nav extends React.Component {
  constructor (props) {
    props.handleSearch();
    super(props);
    console.log(props.autoCompleteData);
  }

  render() {

    return (
        <Toolbar style={this.props.style}>
          <ToolbarGroup>
            <ToolbarTitle text="SuperSorter" style={Styles.toolbarTitle} />
          </ToolbarGroup>
          <FontIcon className="muidocs-icon-custom-sort" />
          <AutoComplete
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.props.autoCompleteData}
            maxSearchResults={5}
            underlineStyle={Styles.searchUnderline}
            onNewRequest={searchStr => console.log(searchStr)}
            fullWidth={true}
            />
          <ToolbarGroup>
            <Upload />
            <FlatButton
              icon={<FontIcon className="material-icons">account_circle</FontIcon>}
              label="michaelbdai"
              style={Styles.userButton} />
          </ToolbarGroup>
        </Toolbar>
    );
  }
}
// <ToolbarGroup>
// </ToolbarGroup>


module.exports = Nav;
