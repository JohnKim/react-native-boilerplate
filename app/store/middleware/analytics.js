/**
 * Facebook Analytics for Apps (https://www.facebook.com/analytics)
 */

const {AppEventsLogger} = require('react-native-fbsdk');

function track(action) {
  switch (action.type) {
   case 'LOGGED_IN':
     AppEventsLogger.logEvent('Login', 1, {source: action.source || ''});
     break;

   case 'LOGGED_OUT':
     AppEventsLogger.logEvent('Logout', 1);
     break;

   case 'SKIPPED_LOGIN':
     AppEventsLogger.logEvent('Skip login', 1);
     break;
  }
}

module.exports = store => next => action => {
  track(action);
  return next(action);
};
