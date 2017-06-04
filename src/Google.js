import React, { PropTypes, Component } from 'react';

class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true
    };
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    (function (id, callback) {
      let script;
      const gs = document.getElementsByTagName('script')[0];
      if (document.getElementById(id)) {
        return;
      }
      script = document.createElement('script');
      script.id = id;
      script.src = 'https://apis.google.com/js/platform.js';
      gs.parentNode.insertBefore(script, gs);
      script.onload = callback;
    }('google-platform', () => {
      window.gapi.load('auth2', () => {
        const params = {
          client_id: '118626549217-67r1dhgjah7mvuec8ngu0umm7mbd7o8p.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/plus.login',
          cookiepolicy: 'single_host_origin',
          login_hint: '',
          fetch_basic_profile: true,
          secret: '8Fubv0MlIlUnwLyI8DGybAWH'
        };
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            () => {},
            err => console.log(err)
          );
        }
        this.setState({
          isDisabled: false
        });
      });
    }));
  }

  signIn(e) {
    if (e) {
      e.preventDefault();
    }

    const auth2 = window.gapi.auth2.getAuthInstance();
    const { onSuccess, onRequest, onFailure, } = this.props;
    const options = {
      response_type: 'permission',
      redirect_uri: 'http://localhost:3004',
      fetch_basic_profile: true,
      prompt: '',
      scope: 'https://www.googleapis.com/auth/plus.login',
      client_id: '118626549217-67r1dhgjah7mvuec8ngu0umm7mbd7o8p.apps.googleusercontent.com',
      login_hint: '',
      secret: 'D7de3aNJzsFcCUIUfk-9NR_m'
    };

    onRequest();
    auth2.signIn(options)
      .then((res) => {
          onSuccess(res);
        }, err =>
          onFailure(err)
      );

  }

  render() {
    return (
      <div>
        <button className={this.props.className} onClick={ this.signIn.bind(this) } disabled={this.state.isDisabled}>
          Login With Google
        </button>
      </div>
    )
  }
}

Google.propTypes = {
  className: PropTypes.string,
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func
};

export default Google;
