import "./PassportUpload.css";
import { classes } from 'istanbul-lib-coverage';
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import PassportInfo from '../PassportInfo/PassportInfo';
import React, { Component } from 'react';

const styles = {
  card: {
    minWidth: 375,
    minHeight: 175,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 28,
  },
  pos: {
    marginBottom: 12,
  },
};

const url = 'http://localhost:8080/api/passport';

export default class PassportUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      fileName: '',
      showResults: false,
      passportInfo: '',
      imageFailed: false
    }

  }

  eventHandler = (event) => {
    let fileName = event.target.files[0].name;
    this.processImage(fileName).then(res => {
      if (res && res.data) this.setState({ passportInfo: res.data, showResults: true });
    })
      .catch(err => {
        this.setState({ imageFailed: true });
        console.log(err);
      });
    if (fileName) this.setState({ isUploading: true, fileName });
  }

  resetComponent = () => {
    this.setState({
      isUploading: false,
      fileName: '',
      showResults: false,
      passportInfo: ''
    })
  }

  processImage = (fileName) => {
    return Axios.get(`${url}/${fileName}`);
  }

  render() {
    return (
      !this.state.showResults
        ?
        <Card style={styles.card} >
          <CardContent>
            <p className={classes.title}>Select your passport image</p>
          </CardContent>
          <CardContent>
            <Fab color="primary" aria-label="add">
              <label className='input-label' htmlFor="fileInput" >
                <AddIcon />
              </label>
              <input id="fileInput" disabled={this.state.isUploading} type="file" onChange={event => this.eventHandler(event)} />
            </Fab>
          </CardContent>
          {this.state.imageFailed ?
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardActions>
                <Button size='large' color='secondary' onClick={this.resetComponent}>
                  Image could not be processed, Process New Passport.
                </Button>
              </CardActions>
            </Card>
            : false
          }
        </Card>
        : <PassportInfo passportInfo={this.state.passportInfo} resetComponent={this.resetComponent} />
    )
  }
}

