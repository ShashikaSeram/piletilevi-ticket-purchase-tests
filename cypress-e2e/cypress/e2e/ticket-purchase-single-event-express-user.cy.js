// /// <reference types="Cypress" />

// import { HomePage } from '../support/pages/home-page.js'
// import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
// import {DeliveryPage} from "../support/pages/delivery-page.js";
// import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
// import {Utils} from '../support/util';

// describe('Ticket purchase flow - single event', () => {
//   before(() => {
//     HomePage.setCookieConsent();
//     HomePage.authorizeHelmsStore();
//     Utils.handleUncaughtExceptions()
//   })
//   beforeEach(() => {
//   HomePage.navigateToHomePage();
//   })

//   it('Purchase a ticket without selecting a seat', () => {
//     cy.fixture('data-event-with-hallplan.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let email = eventData.email
//       let firstAvailableTicket = eventData.firstTicket
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.selectFirstSector();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
//       TicketsSelectionPage.validateFirstTotalForEventWithSeatPlan();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifyRowNumberIsAssigned();
//       TicketsSelectionPage.verifySeatNumberIsAssigned();
//       TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
//       TicketsSelectionPage.validateSecondTotalForEventWithSeatPlan();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       ShoppingCartPage.verifyAddInsuranceIsAvailable();
//       ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

//   it('Purchase a ticket selecting a seat number', () => {
//     cy.fixture('data-event-with-hallplan.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let email = eventData.email
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.selectFirstSector();
//       //TODO need to compare picked seat number with the one under seats offered details
//       TicketsSelectionPage.pickASeatAndVerifyPickedSeatNumberIsShown();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifyRowNumberIsAssigned();
//       TicketsSelectionPage.verifySeatNumberIsAssigned();
//       TicketsSelectionPage.validateTotalForTicketsPickedFromVenueMap();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       ShoppingCartPage.verifyAddInsuranceIsAvailable();
//       ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

//   it('Purchase multiple tickets with same price', () => {
//     cy.fixture('data-event-with-hallplan.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let ticketQuantity2 = eventData.ticketQuantity2
//       let email = eventData.email
//       let firstAvailableTicket = eventData.firstTicket
//       let ticketCount = eventData.ticketCount
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.selectFirstSector();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1);
//       TicketsSelectionPage.addSecondTicketAndVerifyPriceForTwo(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity2)
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifySeatsDetailForMultipleTickets();
//       TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity2);
//       TicketsSelectionPage.confirmTotalPriceForTwo();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity2);
//       ShoppingCartPage.verifyMultipleTicketsAreDisplayedInShoppingCart(ticketCount)
//       ShoppingCartPage.verifyAddInsuranceToAllIsAvailable();
//       ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

//   it('Purchase multiple tickets with different prices', () => {
//     cy.fixture('data-event-with-hallplan.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventWithDifferentPrices
//       let ticketQuantity2 = eventData.ticketQuantity2
//       let email = eventData.email
//       let firstAvailableTicket = eventData.firstTicket
//       let secondAvailableTicket = eventData.secondTicket
//       let ticketCount = eventData.ticketCount
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicketByType(firstAvailableTicket);
//       TicketsSelectionPage.addTicketByType(secondAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity2)
//       TicketsSelectionPage.validateFirstTotalForTwoTickets();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.verifySeatsDetailForMultipleTickets();
//       TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity2);
//       TicketsSelectionPage.validateSecondTotalForTwoTickets();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity2);
//       ShoppingCartPage.verifyMultipleTicketsAreDisplayedInShoppingCart(ticketCount)
//       ShoppingCartPage.verifyAddInsuranceToAllIsAvailable();
//       ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
// })


// })
