// /// <reference types="Cypress" />
// import { HomePage } from '../support/pages/home-page.js'
// import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
// import {DeliveryPage} from "../support/pages/delivery-page.js";
// import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
// import {Utils} from '../support/util';
// import {EventPage} from "../support/pages/event-page";

// describe('Ticket purchase flow - multiple events', () => {
//   before(() => {
//     HomePage.setCookieConsent();
//     HomePage.authorizeHelmsStore();
//     Utils.handleUncaughtExceptions()
//   })
//   beforeEach(() => {
//     HomePage.navigateToHomePage();
//   })

//   it('Purchase multiple tickets for different events', () => {
//     cy.fixture('data-multiple-events.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventOne = eventData.eventOne
//       let eventTwo = eventData.eventTwo
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let ticketQuantity2 = eventData.ticketQuantity2
//       let email = eventData.email
//       let firstAvailableTicket = eventData.firstTicket
//       cy.origin(Cypress.env('portal_host'), {args: {eventOne}}, ({eventOne}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventOne);
//         cy.selectFirstAvailableSubTicket();
//         cy.clickBuyTicket(eventOne);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicketByType(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
//       TicketsSelectionPage.validateFirstTotalForEventWithSeatPlan()
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifyRowNumberIsAssigned();
//       TicketsSelectionPage.verifySeatNumberIsAssigned();
//       TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
//       TicketsSelectionPage.validateSecondTotalForEventWithSeatPlan();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       HomePage.navigateToAllTab();
//       HomePage.searchEventByName(eventTwo);
//       EventPage.clickOnSearchedEvent(eventTwo);
//       EventPage.clickBuyButton();
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1);
//       TicketsSelectionPage.validateFirstTotalForGeneralEvent();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
//       TicketsSelectionPage.validateSecondTotalForGeneralEvent();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity2);
//       ShoppingCartPage.verifySelectedEventsAreDisplayedInShoppingCart();
//       ShoppingCartPage.verifyTotalPriceIsCalculatedCorrectly();
//       ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

// })

