import React, { Component } from 'react';
import PassportInfoRow from './PassportInfoRow';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    backgoundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    // margin: '1rem'
  }
}

export default class PassportInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passportInfoRows: [],
      personalInfoRows: [],
      passportInfo: props.passportInfo || {
        names: { data: "INES", isValid: true },
        surname: { data: "GARCAO DE MAGALHAES", isValid: true },
        dateOfBirth: { data: "740407", isValid: true },
        sex: { data: "F", isValid: true },
        country: { data: "PRT", isValid: false },
        number: { data: "1700044", isValid: true },
        expirationDate: { data: "220616", isValid: false },
        nationality: { data: "PRT", isValid: true },
        personalNumber: { data: "99999999", isValid: true },
        warning: false
      }
    }
  }

  onInputChange = () => {

  }

  componentDidMount() {
    this.definePassportInfoRows(this.state.passportInfo);
    this.definePersonalInfoRows(this.state.passportInfo);
  }

  definePassportInfoRows = (passportInfo) => {
    let passportInfoKeys = [
      'country',
      'number',
      'expirationDate',
      'nationality',
      'personalNumber',
    ]
    let rows = [];
    for (let [key, value] of Object.entries(passportInfo)) {
      if (passportInfoKeys.includes(key)) {
        let label = this.getLabels(key);
        rows.push({ key, value, label })
      }
    }
    this.setState({ passportInfoRows: rows });
  }

  definePersonalInfoRows = (passportInfo) => {
    let personalInfoKeys = [
      'names',
      'surname',
      'dateOfBirth',
      'sex',
    ]
    let rows = [];
    for (let [key, value] of Object.entries(passportInfo)) {
      if (personalInfoKeys.includes(key)) {
        let label = this.getLabels(key);
        rows.push({ key, value, label })
      }
    }
    this.setState({ personalInfoRows: rows });
  }

  getLabels = (key) => {
    let label = '';
    switch (key) {
      case 'country':
        label = 'Country';
        break;
      case 'number':
        label = 'Passport Number';
        break;
      case 'dateOfBirth':
        label = 'Date of Birth';
        break;
      case 'expirationDate':
        label = 'Expiration Date';
        break;
      case 'sex':
        label = 'Sex';
        break;
      case 'names':
        label = 'Name';
        break;
      case 'surname':
        label = 'Last Name';
        break;
      case 'personalNumber':
        label = 'Personal Number';
        break;
      case 'nationality':
        label = 'Nationality';
        break;
      default:
        label = key;
        break;
    }
    return label;
  }


  render() {
    return (
      <div>
        <Card style={styles.container}>
          <CardContent style={styles.section}>
            {this.state.personalInfoRows.length ?
              this.state.personalInfoRows.map(row => {
                return <PassportInfoRow key={row.key} row={row} />
              })
              : false}
          </CardContent>
          <CardContent style={styles.section}>
            {this.state.passportInfoRows.length ?
              this.state.passportInfoRows.map(row => {
                return <PassportInfoRow key={row.key} row={row} />
              })
              : false}
          </CardContent>
        </Card>
        <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardActions>
            <Button size='large' color='primary' onClick={this.props.resetComponent}>
              Process New Passport
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
