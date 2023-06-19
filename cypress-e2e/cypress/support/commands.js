
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { HomePage } from '../support/pages/home-page.js'
import {EventPage} from '../support/pages/event-page.js';
//import {PaymentPage} from '..support/pages/payment-page.js';
import {Utils} from '../support/util.js';
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('verifyHomePage', () => {
  Utils.handleUncaughtExceptions();
  HomePage.verifyHomePage();
})
Cypress.Commands.add('searchAndSelectEvent', (eventName) => {
    HomePage.searchEventByName(eventName);
    EventPage.clickOnSearchedEvent(eventName);
})
Cypress.Commands.add('clickBuyTicket', (venue) => {
  EventPage.verifySelectedEventIsCorrect(venue);
  EventPage.clickBuyButton();
})
// Cypress.Commands.add('visitPaymentGateway', () => {
//   PaymentPage.navigateToPaymentGateway();
// })
