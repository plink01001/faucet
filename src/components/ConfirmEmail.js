/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from '../utils/fetch';
import Loading from '../widgets/Loading';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      error: '',
    };
  }

  componentWillMount() {
    const token = this.props.location.query.token;
    if (!token) {
      this.setState({ status: 'error', error: 'The token is required.' });
    } else {
      fetch(`/api/confirm_email?token=${this.props.location.query.token}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          if (data.success) {
            this.setState({ status: 'success' });
          } else {
            this.setState({ status: 'error', error: data.error });
          }
        })
        .catch((error) => {
          error.response.json().then((data) => {
            this.setState({ status: 'error', error: data.error });
          });
        });
    }
  }

  render() {
    const { status, error } = this.state;
    return (
      <div className="container">
        {status === 'loading' && <Loading />}
        {status === 'error' &&
          <div>
            <h1>Oops!</h1>
            <p>{error}</p>
          </div>
        }
        {status === 'success' &&
          <div>
            <h1>Thank you!</h1>
            <p>Your email address has been verified.</p>
          </div>
        }
      </div>
    );
  }
}