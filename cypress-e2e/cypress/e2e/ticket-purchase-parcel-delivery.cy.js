// /// <reference types="Cypress" />
// import { HomePage } from '../support/pages/home-page.js'
// import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
// import {DeliveryPage} from "../support/pages/delivery-page.js";
// import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
// import {Utils} from '../support/util';

// describe('Ticket purchase flow - Parcel machine delivery methods', () => {
//   before(() => {
//     HomePage.setCookieConsent();
//     HomePage.authorizeHelmsStore();
//     Utils.handleUncaughtExceptions()
//   })
//   beforeEach(() => {
//     HomePage.navigateToHomePage();
//   })

//   it('Purchase a ticket choosing Omniva parcel machine delivery', () => {
//     cy.fixture('data-event-general.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let email = eventData.email
//       let firstName = eventData.firstName
//       let lastName = eventData.lastName
//       let remarks = eventData.remarks
//       let phoneNumber = eventData.phoneNumber
//       let firstAvailableTicket = eventData.firstTicket
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
//       TicketsSelectionPage.validateFirstTotalForGeneralEvent();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.validateSecondTotalForGeneralEvent();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.selectToParcelMachineDeliveryMethod();
//       DeliveryPage.verifyOmnivaDeliveryIsAlreadySelected();
//       DeliveryPage.enterName(firstName,lastName);
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.addRemarks(remarks);
//       DeliveryPage.enterPhoneNumber(phoneNumber);
//       DeliveryPage.chooseFirstParcelMachine();
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       ShoppingCartPage.verifyAddInsuranceIsAvailable();
//       ShoppingCartPage.verifyTotalPriceIsCalculatedIncludingTheDeliveryCost();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

//   it('Purchase a ticket choosing Courier within Estonia and Tallinn delivery', () => {
//     cy.fixture('data-event-general.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let email = eventData.email
//       let firstName = eventData.firstName
//       let lastName = eventData.lastName
//       let remarks = eventData.remarks
//       let phoneNumber = eventData.phoneNumber
//       let deliveryAddress = eventData.deliveryAddress
//       let cityName = eventData.cityName
//       let postalCode = eventData.postalCode
//       let regionName = eventData.regionName
//       let firstAvailableTicket = eventData.firstTicket
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
//       TicketsSelectionPage.validateFirstTotalForGeneralEvent();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.validateSecondTotalForGeneralEvent();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.selectToParcelMachineDeliveryMethod();
//       DeliveryPage.selectAndVerifyCourierWithinEstoniaDelivery();
//       DeliveryPage.enterName(firstName,lastName);
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.enterPhoneNumber(phoneNumber);
//       DeliveryPage.enterAddressDetails(deliveryAddress,cityName,postalCode,regionName);
//       DeliveryPage.selectCountryName();
//       DeliveryPage.addRemarks(remarks);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       ShoppingCartPage.verifyAddInsuranceIsAvailable();
//       ShoppingCartPage.verifyTotalPriceIsCalculatedIncludingTheDeliveryCost();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })

//   it('Purchase a ticket choosing International registered mail delivery', () => {
//     cy.fixture('data-event-general.json').as('eventData')
//     cy.get('@eventData').then((eventData) => {
//       let eventName = eventData.eventName
//       let ticketQuantity1 = eventData.ticketQuantity1
//       let email = eventData.email
//       let firstName = eventData.firstName
//       let lastName = eventData.lastName
//       let remarks = eventData.remarks
//       let phoneNumber = eventData.phoneNumber
//       let deliveryAddress = eventData.deliveryAddress
//       let cityName = eventData.cityName
//       let postalCode = eventData.postalCode
//       let regionName = eventData.regionName
//       let firstAvailableTicket = eventData.firstTicket
//       cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
//         Cypress.require('../support/commands.js')
//         cy.verifyHomePage();
//         cy.searchAndSelectEvent(eventName);
//         cy.clickBuyTicket(eventName);
//       })
//       TicketsSelectionPage.verifyTicketsSelectionPage();
//       TicketsSelectionPage.addTicket(firstAvailableTicket);
//       TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
//       TicketsSelectionPage.validateFirstTotalForGeneralEvent();
//       TicketsSelectionPage.clickFindTicketsButton();
//       TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
//       TicketsSelectionPage.validateSecondTotalForGeneralEvent();
//       TicketsSelectionPage.clickConfirmAllButton();
//       DeliveryPage.verifyDeliveryPage();
//       DeliveryPage.selectToParcelMachineDeliveryMethod();
//       DeliveryPage.selectAndVerifyInternationalPostDelivery();
//       DeliveryPage.enterName(firstName,lastName);
//       DeliveryPage.enterEmailAddress(email);
//       DeliveryPage.enterPhoneNumber(phoneNumber);
//       DeliveryPage.enterAddressDetails(deliveryAddress,cityName,postalCode,regionName);
//       DeliveryPage.selectCountryName();
//       DeliveryPage.addRemarks(remarks);
//       DeliveryPage.clickProceedToCheckout();
//       ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
//       ShoppingCartPage.verifyAddInsuranceIsAvailable();
//       ShoppingCartPage.verifyTotalPriceIsCalculatedIncludingTheDeliveryCost();
//       ShoppingCartPage.selectVisaPaymentMethod();
//       ShoppingCartPage.tickAgreementCheckbox();
//       ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
//     })
//   })


//   })
