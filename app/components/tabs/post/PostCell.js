/**
 *
 * @flow
 */
'use strict';

var React = require('React');
var S5Colors = require('S5Colors');
var StyleSheet = require('StyleSheet');
var { Text } = require('S5Text');
var TouchableHighlight = require('TouchableHighlight');
var View = require('View');
var moment = require('moment');

var { connect } = require('react-redux');

class PostCell extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.cell, !this.props.isSeen && styles.unseen]}>
          <Text style={styles.text}>
            {this.props.post.description}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.time}>
              {moment(this.props.post.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  cell: {
    padding: 15,
    backgroundColor: 'white',
  },
  unseen: {
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4D99EF',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  session: {
    paddingVertical: undefined,
    paddingHorizontal: undefined,
    paddingLeft: undefined,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: S5Colors.cellBorder,
    // overflow: 'hidden',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#eee',
    shadowOpacity: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  url: {
    flex: 1,
    color: S5Colors.actionText,
    fontSize: 12,
    marginBottom: 10,
  },
  time: {
    color: S5Colors.lightText,
    fontSize: 12,
  },
});

module.exports = connect()(PostCell);
