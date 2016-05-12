/**
 *
 * @providesModule s5
 */

var S5 = {

  get Env() {return require('./env')},
  get Actions() { return require('s5-actions'); },
  get Libs() { return require('s5-libs'); },
  get Utils() { return require('s5-utils'); },

};

module.exports = S5;
