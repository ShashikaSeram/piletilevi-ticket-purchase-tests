/// <reference types="Cypress" />

import { HomePage } from '../support/pages/home-page.js'
import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
import {DeliveryPage} from "../support/pages/delivery-page.js";
import {TicketPersonalizationPage} from "../support/pages/ticket-personalization-page.js";
import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
import {Utils} from '../support/util';

describe('Ticket purchase flow - exceptional events', () => {
  before(() => {
    HomePage.setCookieConsent();
    HomePage.authorizeHelmsStore();
    Utils.handleUncaughtExceptions()
  })
  beforeEach(() => {
    HomePage.navigateToHomePage();
  })

  it('Purchase a ticket with mandatory personalization', () => {
    cy.fixture('data-event-exceptional.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventMandatoryPersonalization
      let ticketQuantity1 = eventData.ticketQuantity1
      let personName = eventData.personName
      let email = eventData.expressUserEmail
      let phoneNumber = eventData.phoneNumber
      let firstAvailableTicket = eventData.firstTicket
      cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventName);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addTicket(firstAvailableTicket);
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.validateFirstTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.verifySeatNumberIsAssigned();
      TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
      TicketsSelectionPage.validateSecondTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      TicketPersonalizationPage.verifyPersonalizationPage();
      TicketPersonalizationPage.enterPersonalDetails(personName,phoneNumber,email)
      TicketPersonalizationPage.tickCheckBox();
      TicketPersonalizationPage.clickNextButton();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
    })
  })

  it('Purchase a ticket with optional personalization / skip personalization', () => {
    cy.fixture('data-event-exceptional.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventOptionalPersonalization
      let firstAvailableTicket = eventData.firstTicket
      let ticketQuantity1 = eventData.ticketQuantity1
      let email = eventData.expressUserEmail
      cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventName);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addTicket(firstAvailableTicket);
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.validateFirstTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.verifySeatNumberIsAssigned();
      TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
      TicketsSelectionPage.validateSecondTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      TicketPersonalizationPage.verifyPersonalizationPage();
      TicketPersonalizationPage.skipPersonalization();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
    })
  })

  it('Purchase a ticket with insurance/this event has venue fee + agent fee', () => {
    cy.fixture('data-event-exceptional.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventWithAdditionalFee
      let firstAvailableTicket = eventData.firstTicket
      let ticketQuantity1 = eventData.ticketQuantity1
      let email = eventData.expressUserEmail
      cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventName);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.selectFirstSector();
      TicketsSelectionPage.addTicket(firstAvailableTicket);
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.validateFirstTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.verifySeatNumberIsAssigned();
      TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
      TicketsSelectionPage.validateSecondTotalForEventWithSeatPlan();
      TicketsSelectionPage.clickConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      ShoppingCartPage.clickAddInsuranceButton();
      ShoppingCartPage.verifyAddInsuranceIsChangedToRemoveInsurance();
      ShoppingCartPage.verifyTotalPriceIsCalculatedWithAdditionalFees();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
    })
  })

  it('Purchase a ticket for an event with package purchase', () => {
    cy.fixture('data-event-exceptional.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventPackagePurchase
      let firstAvailableTicket = eventData.firstTicket
      let ticketQuantity1 = eventData.ticketQuantity1
      let ticketQuantity3 = eventData.ticketQuantity3
      let email = eventData.expressUserEmail
      let ticketCount2 = eventData.ticketCount2
      let ticketCount3 = eventData.ticketCount3
      cy.origin(Cypress.env('portal_host'), {args: {eventName}}, ({eventName}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.selectFirstAvailableSubTicket();
        cy.clickBuyTicket(eventName);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.verifyOtherPackageTicketsAvailable(ticketCount2)
      TicketsSelectionPage.addTicketByType(firstAvailableTicket);
      TicketsSelectionPage.verifyTicketCount(ticketQuantity3);
      TicketsSelectionPage.verifyTotalForPackageTickets()
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyRowNumberIsAssigned();
      TicketsSelectionPage.verifySeatNumberIsAssigned();
      TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
      TicketsSelectionPage.clickConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity3);
      ShoppingCartPage.verifyMultipleTicketsAreDisplayedInShoppingCart(ticketCount3);
      ShoppingCartPage.verifyAddInsuranceToAllIsAvailable();
      ShoppingCartPage.verifyBothPaymentMethodsAreDisplayed();
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
    })
  })


})
