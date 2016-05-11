/**
 * @providesModule s5-action
 */

const commonActions = require('./common');
const loginActions = require('./login');
const postActions = require('./post');

module.exports = {
  ...commonActions,
  ...loginActions,
  ...postActions,
};
