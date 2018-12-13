import React from 'react';

import Styles from './Styles';

export default class BigImageView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: this.props.open,
        cameraInfoMake: this.props.metaDataObj.image ? this.props.metaDataObj.image.Make : 'not available for this picture',
        cameraInfoModel: this.props.metaDataObj.image ? this.props.metaDataObj.image.Model : '',
        modifyDate: this.props.metaDataObj.image ? this.props.metaDataObj.image.ModifyDate : 'not Available for this picture'
      }
    }

    render() {

      return (
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1,}}>
            <div style={Object.assign(Styles.bigImageDiv, {backgroundImage: `url("${this.props.src}")`,})} />
          </div>
        </div>
      );
    }
}
