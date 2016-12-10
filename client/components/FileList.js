import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Styles from './Styles';

const FileList = ({fileNames}) => {
  return (
    <List style={Styles.fileList}>
      { fileNames.map(f =>
          <ListItem primaryText={f} key={f} style={Styles.fileListItem}/>) }
    </List>
  );
};

export default FileList;
