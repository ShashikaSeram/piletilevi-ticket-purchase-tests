const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress-e2e/cypress/support/e2e.js',
    specPattern: 'cypress-e2e/cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress-e2e/cypress/fixtures',
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      portal_url: 'https://test.piletilevi.ee/eng/',
      portal_host: 'test.piletilevi.ee',
      store_url: 'https://store.piletilevi.test.helmes.ee/public/en/',
      //payment_gateway: 'https://igw-demo.every-pay.com/lp/bn62fd/CLsaRRvD',
      //payment_portal_host: 'igw-demo.every-pay.com'
    }
  },
});