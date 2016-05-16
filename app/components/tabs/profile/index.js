/**
 *
 * @flow
 */

'use strict';

var React = require('React');
var ListContainer = require('S5ListContainer');
var ProfilePicture = require('S5ProfilePicture');
var PureListView = require('S5PureListView');
var EmptyListRow = require('S5EmptyListRow');
var PostCell = require('../post/PostCell')
var View = require('View');
var StyleSheet = require('S5StyleSheet');
var { connect } = require('react-redux');

var {
  logOutWithPrompt, loadPostByPage
} = require('../../actions');

var Navigator = require('Navigator');
import type {State as User} from '../../reducers/user';
import type {Post} from '../../reducers/post';

type Props = {
  user: User;
  posts: Array<Post>;
  navigator: Navigator;
  logOut: () => void;
  loadPost: (page: number) => Array<Post>;
};

class ProfileView extends React.Component {

  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.posts,
      pageNumber: 1,
    };

    this.openSharingSettings = this.openSharingSettings.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.openPostDetail = this.openPostDetail.bind(this);

    // TODO: 테스트를 위해 여기에서 로딩한다! 나중에는 다른 곳에서 해야 겠지!?
    this.props.loadPost(this.state.pageNumber);
  }

  render() {

    var rightItem;
    if (this.props.user.isLoggedIn) {
      rightItem = {
        title: 'Settings',
        icon: require('./img/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    const profilePicture = this.props.user.isLoggedIn &&
      <ProfilePicture userID={this.props.user.id} size={100} />;

    return (
      <View style={styles.container}>
        <ListContainer
          title="Profile"
          parallaxContent={profilePicture}
          backgroundImage={require('./img/profile-background.png')}
          backgroundColor={'#9176D2'}
          rightItem={rightItem}>
          <PureListView
            data={this.state.posts}
            renderEmptyList={this.renderEmptyList}
            renderRow={this.renderRow}
          />
        </ListContainer>
      </View>
    );
  }

  openSharingSettings() {
    this.props.navigator.push({shareSettings: 1});
  }

  renderEmptyList() {
    return (
      <EmptyListRow
        title="No Post Yet"
        text="Important updates and announcements will appear here"
      />
    );
  }

  renderRow(post) {
    return (
      <PostCell
        key={post.id}
        post={post}
        onPress={() => this.openPostDetail(post)}
      />
    );
  }

  openPostDetail(post) {
    console.log(post);
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

function select(store) {
  return {
    user: store.user,
    posts: store.post,
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    loadPost: (page: number) => dispatch(loadPostByPage(page, 20)),
  };
}

module.exports = connect(select, actions)(ProfileView);
