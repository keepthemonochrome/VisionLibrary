import React from 'react';

import Styles from './Styles';

export default class BigImageView extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.metaDataObj);
      // var cb = (metaDataObj) => {
      //   this.setState({metaData: {
      //     cameraInfoMake: metaDataObj.image.Make,
      //     cameraInfoModel: metaDataObj.image.Model,
      //     modifyDate: metaDataObj.image.ModifyDate
      //   }})
      // }



      this.state = {
        open: this.props.open,
        // metaData: {
        //   cameraInfoMake: metaDataObj.image.Make,
        //   cameraInfoModel: metaDataObj.image.Model,
        //   modifyDate: metaDataObj.image.ModifyDate
        // }
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
                <li>Date: { this.props.metaDataObj.image.ModifyDate }</li>
                <li>Camera Info: {this.props.metaDataObj.image.Make + ' ' + this.props.metaDataObj.image.Model}</li>
              </ul>
            </div>
        </div>
      );
    }
}
