
import React, { Component } from 'react';

import {
  AppState,
  StyleSheet,
  StatusBar,
  View,
  Linking,
} from 'react-native';

import {
  Envs.VERSION                as VERSION,
  Actions.loadConfig          as loadConfig,
  Actions.updateInstallation  as updateInstallation,
} from 's5';

import LoginView from './login/LoginView';
import S5Navigator from './navigator';

import { connect } from 'react-redux';
/* ************************************************************************** */

class S5App extends Component {

  static propTypes = {
    isLoggedIn : React.PropTypes.func;
  };

  componentDidMount() {
    AppState.addEventListener('change', ::this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet

    this.props.dispatch(loadConfig());

    updateInstallation({VERSION});

    Linking.addEventListener('url', ::this.handleOpenURL);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', ::this.handleAppStateChange);

    Linking.removeEventListener('url', ::this.handleOpenURL);
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState === 'active') { // active, background, inactive
      // TODO: Notification 같은 정보를 가져옴 !
    }
  }

  handleOpenURL(event) {
    if( event.url.indexOf( "S5Trippin:") > -1 ){
      console.log(event.url);
      var url = event.url.replace('S5Trippin://', '');
      // TODO: implements logic !! (dispatch some actions)

    }
  }

  render() {

    if (!this.props.isLoggedIn) {
      return <LoginView />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <S5Navigator />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(S5App);
