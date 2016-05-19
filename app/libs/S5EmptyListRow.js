/**
 * @providesModule S5EmptyListRow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
var { Paragraph, Heading1 } = require('S5Text');


export default class S5EmptyListRow extends Component {

  static propTypes = {
    style: React.PropTypes.any,
    title: React.PropTypes.string,
    image: React.PropTypes.number,
    text: React.PropTypes.string,
    children: React.PropTypes.any,
  };

  render() {
    const image = this.props.image &&
      <Image style={styles.image} source={this.props.image} />;
    const title = this.props.title &&
      <Heading1 style={styles.title}>{this.props.title}</Heading1>;

    return (
      <View style={[styles.container, this.props.style]}>
        {image}
        {title}
        <Paragraph style={styles.text}>
          {this.props.text}
        </Paragraph>
        {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  },
});
