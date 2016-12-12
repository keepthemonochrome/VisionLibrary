import React from 'react';

import Styles from './Styles';

export default class BigImageView extends React.Component {
    constructor(props) {
      super(props);
      fetch('/api/metadata/' + this.props.src.split('/').pop())
      .then(res => console.log(res))

      this.state = {
        open: this.props.open,
        metaData: {}
      }
    }

    render() {

      return (
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1,}}>
            <div style={Object.assign(Styles.bigImageDiv, {backgroundImage: `url("${this.props.src}")`,})} />
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
