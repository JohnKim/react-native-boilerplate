
import {
  Platform,
  Alert,
  ActionSheetIOS,
} from 'react-native';
import Parse from 'parse/react-native';
import FacebookSDK from 'FacebookSDK';
import {updateInstallation} from './common';


export const LOGGED_IN = 'LOGGED_IN';
export const SKIPPED_LOGIN = 'SKIPPED_LOGIN';
export const LOGGED_OUT = 'LOGGED_OUT';


async function ParseFacebookLogin(scope) {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(scope, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    });
  });
}

async function queryFacebookAPI(path, ...args) {
  return new Promise((resolve, reject) => {
    FacebookSDK.api(path, ...args, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    });
  });
}

async function _logInWithFacebook(source) {
  await ParseFacebookLogin('public_profile,email,user_friends');
  const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

  const user = await Parse.User.currentAsync();
  user.set('facebook_id', profile.id);
  user.set('name', profile.name);
  user.set('email', profile.email);
  await user.save();
  await updateInstallation({user});

  const action = {
    type: LOGGED_IN,
    source,
    data: {
      id: profile.id,
      name: profile.name,
    },
  };

  return Promise.all([
    Promise.resolve(action),
    //restoreFavorite(),
  ]);
}

export function logInWithFacebook(source) {
  return (dispatch) => {
    const login = _logInWithFacebook(source);

    login.then(
      (result) => {
        dispatch(result);
      }
    );
    return login;
  };
}

export function skipLogin() {
  return {
    type: SKIPPED_LOGIN,
  };
}

export function logOut() {
  return (dispatch) => {
    Parse.User.logOut();
    FacebookSDK.logout();
    updateInstallation({user: null, channels: []});

    // TODO: Make sure reducers clear their state
    return dispatch({
      type: LOGGED_OUT,
    });
  };
}

export function logOutWithPrompt() {
  return (dispatch, getState) => {
    let name = getState().user.name || 'there';

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Hi, ${name}`,
          options: ['Log out', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            dispatch(logOut());
          }
        }
      );
    } else {
      Alert.alert(
        `Hi, ${name}`,
        'Log out from S5Trippin?',
        [
          { text: 'Cancel' },
          { text: 'Log out', onPress: () => dispatch(logOut()) },
        ]
      );
    }
  };
}
