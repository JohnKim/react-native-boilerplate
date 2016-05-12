
import React, { Component } from 'react';

import {
  StyleSheet,
} from 'react-native';

import {
  Libs.S5Button as S5Button,
  Actions.logInWithFacebook as logInWithFacebook,
} from 's5';

import { connect } from ('react-redux');

// Login Button Class
class LoginButton extends Component {

  props: {
    style: any;
    source?: string; // For Facebook Developer Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };

  state: {
    isLoading: boolean;
  };

  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <S5Button
          style={[styles.button, this.props.style]}
          caption="Please wait..."
        />
      );
    } else {
      return (
        <S5Button
          style={[styles.button, this.props.style]}
          icon={require('./img/f-logo.png')}
          caption="Log in with Facebook"
          onPress={() => this.logIn()}
        />
      );
    }
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});

    try {
      await Promise.race([
        dispatch(logInWithFacebook(this.props.source)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

module.exports = connect()(LoginButton);
