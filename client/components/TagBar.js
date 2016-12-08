import React from 'react';
import ReactDOM from 'react-dom';
import Chip from 'material-ui/Chip';
import {map} from 'lodash';
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
            map(props.tags, t =>
              <Chip
                className='tag'
                style={props.tagStyle}
                key={t}
                onRequestDelete={() => null}>
                {t}
              </Chip>)
          }
        </div>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default TagBar;
