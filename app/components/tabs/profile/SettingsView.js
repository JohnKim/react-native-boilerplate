/**
 *
 *
 * @flow
 */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');

var View = require('View');
var S5Header = require('S5Header');
var StatusBar = require('StatusBar');

var { logOutWithPrompt } = require('../../actions');

var { connect } = require('react-redux');

import type {State as User} from '../../reducers/user';


class SettingView extends React.Component {
  props: {
    navigator: Navigator;
    dispatch: () => void;
    user: User;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="default"
         />
        <S5Header
          style={styles.header}
          foreground="dark"
          title="Settings"
          leftItem={{
            icon: require('../../common/img/back.png'),
            title: 'Back',
            layout: 'icon',
            onPress: () => this.props.navigator.pop(),
          }}
          rightItem={{
            icon: require('./img/logout.png'),
            title: 'Logout',
            onPress: () => this.props.dispatch(logOutWithPrompt()),
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 49,
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
});

function select(store) {
  return {
    user: store.user,
  };
}

module.exports = connect(select)(SettingView);
