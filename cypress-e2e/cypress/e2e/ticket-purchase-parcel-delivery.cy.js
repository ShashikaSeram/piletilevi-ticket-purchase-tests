/// <reference types="Cypress" />
import { HomePage } from '../support/pages/home-page.js'
import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
import {DeliveryPage} from "../support/pages/delivery-page.js";
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

  it('Verify purchase process for a general event(one ticket) - choosing ToParcel delivery method/Omniva', () => {
    cy.fixture('data-event-general.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketQuantity1 = eventData.ticketQuantity1
      let email = eventData.email
      let firstName = eventData.firstName
      let lastName = eventData.lastName
      let remarks = eventData.remarks
      let phoneNumber = eventData.phoneNumber
      let parcelMachineName = eventData.parcelMachineName
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addFirstAvailableTicket();
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.verifyAddedTicketPriceIsCorrect();
      TicketsSelectionPage.clickConfirmAllButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.confirmSelectedTicketDetails();
      TicketsSelectionPage.clickSecondConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.selectToParcelMachineDeliveryMethod();
      DeliveryPage.verifyOmnivaDeliveryIsAlreadySelected();
      // let deliveryCost;
      // deliveryCost = DeliveryPage.getOmnivaDeliveryCost();
      DeliveryPage.enterName(firstName,lastName);
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.addRemarks(remarks);
      DeliveryPage.enterPhoneNumber(phoneNumber);
      DeliveryPage.chooseFirstParcelMachine(parcelMachineName);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
    // TODO verify shopping cart summary value is equal to the addition of delivery and ticket price
      // ShoppingCartPage.clickShoppingCartSummaryInfoButton();
      // ShoppingCartPage.verifyTotalPriceIsCalculatedCorrectlyForParcelMethod(ticketPrice,deliveryCost);
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
    // TODO click pay button
    })
  })

  it('Verify purchase process for a general event(one ticket) - choosing ToParcel delivery method/Courier within Estonia', () => {
    cy.fixture('data-event-general.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketQuantity1 = eventData.ticketQuantity1
      let email = eventData.email
      let firstName = eventData.firstName
      let lastName = eventData.lastName
      let remarks = eventData.remarks
      let phoneNumber = eventData.phoneNumber
      let deliveryAddress = eventData.deliveryAddress
      let cityName = eventData.cityName
      let postalCode = eventData.postalCode
      let regionName = eventData.regionName
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addFirstAvailableTicket();
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.verifyAddedTicketPriceIsCorrect();
      TicketsSelectionPage.clickConfirmAllButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.confirmSelectedTicketDetails();
      TicketsSelectionPage.clickSecondConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.selectToParcelMachineDeliveryMethod();
      DeliveryPage.selectAndVerifyCourierWithinEstoniaDelivery();
      // let deliveryCost;
      // deliveryCost = DeliveryPage.getOmnivaDeliveryCost();
      DeliveryPage.enterName(firstName,lastName);
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.enterPhoneNumber(phoneNumber);
      DeliveryPage.enterAddressDetails(deliveryAddress,cityName,postalCode,regionName);
      DeliveryPage.selectCountryName();
      DeliveryPage.addRemarks(remarks);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
    // TODO verify shopping cart summary value is equal to the addition of delivery and ticket price
      // ShoppingCartPage.clickShoppingCartSummaryInfoButton();
      // ShoppingCartPage.verifyTotalPriceIsCalculatedCorrectlyForParcelMethod(ticketPrice,deliveryCost);
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
    // TODO click pay button
    })
  })

  it('Verify purchase process for a general event(one ticket) - choosing ToParcel delivery method/International post', () => {
    cy.fixture('data-event-general.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventName
      let eventVenue = eventData.eventVenue
      let ticketQuantity1 = eventData.ticketQuantity1
      let email = eventData.email
      let firstName = eventData.firstName
      let lastName = eventData.lastName
      let remarks = eventData.remarks
      let phoneNumber = eventData.phoneNumber
      let deliveryAddress = eventData.deliveryAddress
      let cityName = eventData.cityName
      let postalCode = eventData.postalCode
      let regionName = eventData.regionName
      cy.origin(Cypress.env('portal_host'), {args: {eventName, eventVenue}}, ({eventName, eventVenue}) => {
        Cypress.require('../support/commands.js')
        cy.verifyHomePage();
        cy.searchAndSelectEvent(eventName);
        cy.clickBuyTicket(eventVenue);
      })
      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.addFirstAvailableTicket();
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.verifyAddedTicketPriceIsCorrect();
      TicketsSelectionPage.clickConfirmAllButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.confirmSelectedTicketDetails();
      TicketsSelectionPage.clickSecondConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.selectToParcelMachineDeliveryMethod();
      DeliveryPage.selectAndVerifyInternationalPostDelivery();
      // let deliveryCost;
      // deliveryCost = DeliveryPage.getOmnivaDeliveryCost();
      DeliveryPage.enterName(firstName,lastName);
      DeliveryPage.enterEmailAddress(email);
      DeliveryPage.enterPhoneNumber(phoneNumber);
      DeliveryPage.enterAddressDetails(deliveryAddress,cityName,postalCode,regionName);
      DeliveryPage.selectCountryName();
      DeliveryPage.addRemarks(remarks);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.verifyAddInsuranceIsAvailable();
      // TODO verify shopping cart summary value is equal to the addition of delivery and ticket price
      // ShoppingCartPage.clickShoppingCartSummaryInfoButton();
      // ShoppingCartPage.verifyTotalPriceIsCalculatedCorrectlyForParcelMethod(ticketPrice,deliveryCost);
      ShoppingCartPage.selectVisaPaymentMethod();
      ShoppingCartPage.tickAgreementCheckbox();
      // TODO click pay button
    })
  })


  })
