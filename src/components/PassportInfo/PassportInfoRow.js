import React from 'react';
import { CardContent, TextField } from '@material-ui/core';

const styles = {
  card: {
    width: 435,
    height: '2.5rem',
    display: 'flex',
    margin: '.3rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.3rem',

  },
};

export default class PassportInfoRow extends React.Component {
  state = {
    value: this.props.row.value.data,
    isReadOnly: true,
    displayWarning: !this.props.row.value.isValid
  }

  onInputChange = (event) => {
    let value = event.target.value;
    this.setState({ value });
  };

  render() {
    return (
      <div style={styles.card}>
        <CardContent>
          <TextField
            id="standard-basic"
            error={this.state.displayWarning}
            style={{ minWidth: 275 }}
            label={this.props.row.label}
            margin="normal"
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </CardContent>
      </div >
    )
  }
}
