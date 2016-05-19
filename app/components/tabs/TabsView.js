
import React, { Component } from 'react';
import {
  StatusBarIOS,
  TabBarIOS,
  TabBarItemIOS,
  Navigator,
} from 'react-native';
import { connect }      from 'react-redux';

// S5 제공 라이브러리
import { S5Colors }     from 's5-lib';
import { switchTab }    from 's5-action';

// Tab 페이지
import MapView          from './map';
import NotificationView from './notification';
import PostView         from './post';
import ProfileView      from './profile';


class TabsView extends Component {

  static propTypes = {
    tab: React.PropTypes.oneOf(['map', 'post', 'profile', 'notification']),
    onTabSelect: React.PropTypes.func,
    navigator: Navigator,
  };

  componentDidMount() {
    StatusBarIOS && StatusBarIOS.setStyle('light-content');
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {

    return (
      <TabBarIOS tintColor={S5Colors.darkText}>
        <TabBarItemIOS
          title="Map"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./map/img/map-icon.png')}
          selectedIcon={require('./map/img/map-icon-active.png')}>
          <MapView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Trips"
          selected={this.props.tab === 'post'}
          onPress={this.onTabSelect.bind(this, 'post')}
          icon={require('./post/img/post-icon.png')}
          selectedIcon={require('./post/img/post-icon-active.png')}>
          <PostView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="My trips"
          selected={this.props.tab === 'profile'}
          onPress={this.onTabSelect.bind(this, 'profile')}
          icon={require('./profile/img/profile-icon.png')}
          selectedIcon={require('./profile/img/profile-icon-active.png')}>
          <ProfileView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Notifications"
          selected={this.props.tab === 'notification'}
          onPress={this.onTabSelect.bind(this, 'notification')}
          icon={require('./notification/img/notification-icon.png')}
          selectedIcon={require('./notification/img/notification-icon-active.png')}>
          <NotificationView navigator={this.props.navigator} />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

function select(store) {
  return {
    tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(TabsView);
