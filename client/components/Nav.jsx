import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Upload from './upload.js';
import Styles from './Styles'

class Nav extends React.Component {
  constructor (props) {

    super(props);
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
            onNewRequest={searchStr => this.props.handleSearch(searchStr, 10)}
            fullWidth={true}
            inputStyle={{color: 'white'}}
            id='navSearch'
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
