/**
 *
 * @flow
 */

'use strict';

var React = require('React');
var ListContainer = require('S5ListContainer');
var View = require('View');
var StyleSheet = require('S5StyleSheet');
var { Text } = require('S5Text');
var { connect } = require('react-redux');


class NotificationView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ListContainer
          title="Notification"
          backgroundImage={require('./img/notification-background.png')}
          backgroundColor={'#9176D2'}>
          <View style={styles.section}>
            <Text>
              THIS IS NOTIFICATION VIEW
            </Text>
          </View>
        </ListContainer>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = connect()(NotificationView);
