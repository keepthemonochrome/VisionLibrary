const Styles = {
  uploadButton: {
    color: 'white',
    width: 120
  },
  userButton: {
    color: 'white',
    width: 170
  },
  searchUnderline: {
    color: '#2196F3'
  },
  toolbarTitle: {
    color: 'white'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '90%',
    height: '100%',
    overflowY: 'auto',
  },
  image: {
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    minWidth: '100%',
    verticalAlign: 'bottom',
  },
  imageSelect: {
    outline: '5px solid #03A9F4',
    outlineOffset: -5,
  },
  imageCtr: {
    height: 200,
    flexGrow: 1,
    backgroundColor: 'rgb(159, 159, 159)',
    margin: '0px 1px 4px 1px',
  },
  deleteButton: {
    color: 'rgb(200, 78, 78)',
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  uploadContainer: {
    display: 'flex',
    height: 300
  },
  dropzone: {
    width: 250,
    backgroundColor: 'rgb(226, 226, 226)',
    border: '1px dashed rgb(139, 139, 139)',
    padding: 10,
    flex: '1 0 auto'
  },
  fileList: {
    width: 400,
    margin: '0 10px 0 10px',
  },
  fileListItem: {
    color: '#64B5F6',
  },
  bigImageDiv: {
    backgroundColor: 'black',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundPosition: 'center center',
  },




  // TEXT
  uploadDialogTitle: 'Photo Upload',
}

export default Styles;
