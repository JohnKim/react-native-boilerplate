/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
  FacebookSDK,
  S5Env,
} from 's5-component';

import Parse from 'parse/react-native';
import Relay from 'react-relay';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

/* Application */ import App from './components/app';
/* Application (for UI test) */ //import App from './AppPlayground';

function setup(): Component {

  console.disableYellowBox = true;

  Parse.initialize(S5Env.APP_ID);
  Parse.serverURL = `${S5Env.SERVER_URL}/parse`;

  FacebookSDK.init();
  Parse.FacebookUtils.init();

  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`${S5Env.SERVER_URL}/graphql`, {
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
