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


class MapView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ListContainer
          title="Map"
          isSimpleTitle={true}
          backgroundImage={require('./img/map-background.png')}
          backgroundColor={'#9176D2'}>
          <View style={styles.section}>
            <Text>
              THIS IS MAP VIEW
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

module.exports = connect()(MapView);
