/**
 * User Reducer.
 */

import { LOGGED_IN, SKIPPED_LOGIN, LOGGED_OUT} from 's5-action';

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  id: null,
  name: null,
};

function user(state = initialState, action) {

  if (action.type === LOGGED_IN) {
    let {id, name} = action.data;
    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      id,
      name,
    };
  }

  if (action.type === SKIPPED_LOGIN) {
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      id: null,
      name: null,
    };
  }

  if (action.type === LOGGED_OUT) {
    return initialState;
  }

  return state;
}

module.exports = user;
