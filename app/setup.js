/**
 *
 * @flow
 */

import React, { Component } from 'react';
import { APP_ID, SERVER_URL } from 's5-env';
import { FacebookSDK } from 's5-util';

import Parse from 'parse/react-native';
import Relay from 'react-relay';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

/* Application */ import App from './components/app';
/* Application (for UI test) */ //import App from './AppPlayground';

function setup(): Component {

  console.disableYellowBox = true;

  Parse.initialize(APP_ID);
  Parse.serverURL = `${SERVER_URL}/parse`;

  FacebookSDK.init();
  Parse.FacebookUtils.init();

  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`${SERVER_URL}/graphql`, {
      fetchTimeout: 30000,
      retryDelays: [5000, 10000],
    })
  );

  class Root extends Component {

    state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };

    render() {
      if (this.state.isLoading) {
        return null;
      }

      /** 컴포넌트에 Store를 제공하는 Provider (최상위 컨포넌트) **/
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }

  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;
