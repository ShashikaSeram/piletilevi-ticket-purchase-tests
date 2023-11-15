const { defineConfig } = require("cypress");
const { install } = require('@neuralegion/cypress-har-generator');

module.exports = defineConfig({
  projectId: "ujkfmw",
  e2e: {
    defaultCommandTimeout: 20000,
    video: false,
    supportFile: 'cypress-e2e/cypress/support/e2e.js',
    specPattern: 'cypress-e2e/cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress-e2e/cypress/fixtures',
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    baseUrl: 'https://store.piletilevi.test.helmes.ee/public/en',
    setupNodeEvents(on, config) {
      install(on);
    },
    env: {
      portal_url: 'https://test.piletilevi.ee/eng/',
      portal_host: 'test.piletilevi.ee',
      store_url: 'https://store.piletilevi.test.helmes.ee/public/en/',
      hars_folders: "cypress-e2e/hars",
      eventPromo_url: 'https://store.piletilevi.test.helmes.ee/public/en/event/382279',
    }
  },
});
const { defineConfig } = require("cypress");
const { install } = require('@neuralegion/cypress-har-generator');

module.exports = defineConfig({
  projectId: "ujkfmw",
  e2e: {
    defaultCommandTimeout: 20000,
    video: false,
    supportFile: 'cypress-e2e/cypress/support/e2e.js',
    specPattern: 'cypress-e2e/cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress-e2e/cypress/fixtures',
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    baseUrl: 'https://store.piletilevi.test.helmes.ee/public/en',
    setupNodeEvents(on, config) {
      install(on);
    },
    env: {
      portal_url: 'https://test.piletilevi.ee/eng/',
      portal_host: 'test.piletilevi.ee',
      store_url: 'https://store.piletilevi.test.helmes.ee/public/en/',
      hars_folders: "cypress-e2e/hars",
      eventPromo_url: 'https://store.piletilevi.test.helmes.ee/public/en/event/382279',
    }
  },
});
