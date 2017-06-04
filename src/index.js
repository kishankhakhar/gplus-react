/**
 * Created by Kishan Khakhar on 04/06/17.
 */
import React, { Component, PropTypes } from 'react';
import Google from './Google';
import Profile from './Profile';

class GoogleApp extends Component {
  constructor() {
    super();
    this.state = {};
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onRequest = this.onRequest.bind(this);
  }

  onSuccess(res) {
    const basicProfile = res.getBasicProfile();
    console.log(basicProfile, 'ssss');
    this.setState({
      isLoading: false,
      userProfile: {
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName()
      }
    })
  };

  onFailure(error) {
    console.log('ffff', error);
    this.setState({
      isLoading: false,
      error
    });
  };

  onRequest() {
    console.log('rrrr');
    this.setState({isLoading: true});
  }

  renderProfile() {
    console.log(this.state, 'cccc')
    if (this.state.isLoading) {
      return (
        <div className="loading">
          Loading...
        </div>
      )
    }
    if (this.state.error) {
      return (
        <div className="error">
          ERROR
        </div>
      )
    }
    return <Profile {...this.state.userProfile} />
  }

  render() {
    return (
      <div className="login-app">
        <Google
          onRequest={this.onRequest}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
        {this.renderProfile()}
      </div>
    )
  }
}

export default GoogleApp;


