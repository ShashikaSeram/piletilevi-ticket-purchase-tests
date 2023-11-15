const { install } = require('@neuralegion/cypress-har-generator');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = on => {
  install(on);
};
