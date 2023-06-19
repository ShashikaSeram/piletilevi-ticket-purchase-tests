/// <reference types="Cypress" />
import { HomePage } from '../support/pages/home-page.js'
import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
import {DeliveryPage} from "../support/pages/delivery-page.js";
import {TicketPersonalizationPage} from "../support/pages/ticket-personalization-page.js";
import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
import {Utils} from '../support/util';

describe('Ticket purchasing scenarios for all types of tickets', () => {
  before(() => {
    HomePage.setCookieConsent();
    HomePage.authorizeHelmsStore();
    Utils.handleUncaughtExceptions()
  })
  beforeEach(() => {
  HomePage.navigateToHomePage();
  })

  it('Verify purchase process for an event with a hall plan - no seat selection + skip ticket personalization', () => {
    cy.fixture('data-event-with-hallplan.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketPrice = eventData.ticketPrice
      let ticketQuantity = eventData.ticketQuantity
      let totalPrice = eventData.ticketPrice
      let email = eventData.email
      let ownerName = eventData.ownerName
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.selectSectorAndAddTicket(ticketPrice);
      TicketsSelectionPage.verifyAddedTicketsQuantityAndTotalSum(ticketQuantity, totalPrice);
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.verifySeatNumberIsAssigned();
      TicketsSelectionPage.verifyTicketDetailsBeforeConfirmAll(ticketQuantity,totalPrice);
      TicketsSelectionPage.clickSecondConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      TicketPersonalizationPage.verifyPersonalizationPage();
      TicketPersonalizationPage.skipPersonalization();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      // TODO click buy button
      // ShoppingCartPage.clickPayButton(totalPrice);
      // cy.origin('igw-demo.every-pay.com',() => {
      //   cy.visit('https://igw-demo.every-pay.com/lp/')
      //   })
    })
  })

  it('Verify purchase process for an event with a hall plan + ticket personalization - with seat selection', () => {
    cy.fixture('data-event-with-hallplan.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketQuantity = eventData.ticketQuantity
      let email = eventData.email
      let ownerName = eventData.ownerName
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      //TODO need to compare picked seat number with the one under seats offered details
      TicketsSelectionPage.pickASeatAndVerifyPickedSeatNumberIsShown();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.confirmSelectedTicketDetails();
      TicketsSelectionPage.clickSecondConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      TicketPersonalizationPage.verifyPersonalizationPage();
      TicketPersonalizationPage.enterName(ownerName);
      TicketPersonalizationPage.tickCheckBox();
      TicketPersonalizationPage.clickNextButton();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      //TODO click buy button
    })
  })

  it('Verify purchase process for a general event(multiple tickets) - Selecting multiple tickets from the same event(same ticket type)', () => {
    cy.fixture('data-event-general.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketPrice = eventData.ticketPrice
      let ticketQuantity2 = eventData.ticketQuantity2
      let totalPrice = eventData.ticketPrice
      let email = eventData.email
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addFirstAvailableTicket();
      TicketsSelectionPage.addFirstAvailableTicket();
      TicketsSelectionPage.verifyTicketCount(ticketQuantity2)
      //TicketsSelectionPage.verifyAddedTicketPriceIsCorrect();
      // TicketsSelectionPage.clickConfirmAllButton();
      // TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      // TicketsSelectionPage.confirmSelectedTicketDetails();
      // TicketsSelectionPage.clickSecondConfirmAllButton();
      // DeliveryPage.verifyDeliveryPage();
      // DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      // DeliveryPage.enterEmailAddress(email);
      // DeliveryPage.clickProceedToCheckout();
      // ShoppingCartPage.verifyShoppingCartPage(ticketQuantity);
      // ShoppingCartPage.verifyAddInsuranceIsAvailable();
      // ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      // ShoppingCartPage.selectVisaPaymentMethod();
      // ShoppingCartPage.tickAgreementCheckbox();
    })
  })



})
