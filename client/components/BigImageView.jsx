import React from 'react';

import Styles from './Styles';

export default class BigImageView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: this.props.open
      }
    }

    render() {
      return (
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1,}}>
            <div
              style={{
                backgroundImage: `url("${this.props.src}")`,
                backgroundColor: 'black',
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                backgroundPosition: 'center center',
              }} />
          </div>
          <div style={{width: 200, paddingLeft: 20}}>
              <h3>Image Title</h3>
              <ul>
                <li>Date</li>
                <li>Camera Info</li>
              </ul>
            </div>
        </div>
      );
    }
}
