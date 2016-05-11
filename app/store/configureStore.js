/**
 *
 * @flow
 */

'use strict';

/* import modules *************************************************************/
var {applyMiddleware, createStore} = require('redux');
var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');

import thunk from "redux-thunk"; // (https://github.com/gaearon/redux-thunk)
import createLogger = from('redux-logger'); // (https://github.com/theaqua/redux-logger)

var promise = require('./promise');
var array = require('./array');
var analytics = require('./analytics');

// reducer
var reducers = require('../reducers');
/* ************************************************************************** */

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome, // 로깅 조건
  collapsed: true,
  duration: true,
});

var createS5Store = applyMiddleware(
  thunk,
  promise,
  array,
  analytics,
  logger
)(createStore);

function configureStore(onComplete: ?() => void) {

  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker

  const store = autoRehydrate()(createS5Store)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
