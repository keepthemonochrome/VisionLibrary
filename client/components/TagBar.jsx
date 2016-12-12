import React from 'react';
import ReactDOM from 'react-dom';
import Chip from 'material-ui/Chip';
import map from 'lodash/fp/map';
import FontIcon from 'material-ui/FontIcon';

const tagBarStyles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';

const TagBar = props => {
  return (
    <Toolbar style={props.style}>
      <ToolbarGroup>
        <div style={tagBarStyles.wrapper}>
          {
            map(t =>
              <Chip
                className='tag'
                style={props.tagStyle}
                key={t}>
                {t}
              </Chip>, props.tags)
          }
        </div>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default TagBar;
