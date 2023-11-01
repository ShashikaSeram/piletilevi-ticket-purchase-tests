/// <reference types="Cypress" />

import {HomePage} from '../support/pages/home-page.js'
import {LoginPage} from '../support/pages/login-page.js'
import {UserAccountPage} from '../support/pages/user-account-page.js'
import {TicketsSelectionPage} from "../support/pages/tickets-selection-page.js";
import {DeliveryPage} from "../support/pages/delivery-page.js";
import {ShoppingCartPage} from "../support/pages/shopping-cart-page.js"
import {Utils} from '../support/util';
import {CheckoutPage} from "../support/pages/checkout-page";

describe('Ticket purchase flow for a Logged-in user', () => {
  before(() => {
    HomePage.setCookieConsent();
    Utils.handleUncaughtExceptions()
  })
  beforeEach(() => {
    HomePage.navigateToEventWithPromoCode()
  })

  it('Purchase a ticket using promo code and verify the order checkout page', () => {
    cy.fixture('data-event-exceptional.json').as('eventData')
    cy.get('@eventData').then((eventData) => {
      let eventName = eventData.eventPromoCode
      let ticketQuantity1 = eventData.ticketQuantity1
      let userEmail = eventData.loggedInUserEmail
      let userName = eventData.loggedInUserName
      let password = eventData.password
      let promoCode = eventData.promoCode

      TicketsSelectionPage.verifyTicketsSelectionPage();
      TicketsSelectionPage.verifyCorrectEventIsShown(eventName);
      TicketsSelectionPage.enterAndSubmitPromoCode(promoCode);
      TicketsSelectionPage.verifyPromoCodeIsAppliedSuccessfully();
      TicketsSelectionPage.addTicketAppliedPromocode();
      TicketsSelectionPage.verifyTicketCount(ticketQuantity1)
      TicketsSelectionPage.validateFirstTotalForPromoTicket();
      TicketsSelectionPage.clickFindTicketsButton();
      TicketsSelectionPage.verifySeatsOfferedViewIsPresent();
      TicketsSelectionPage.verifyTicketCountBeforeConfirmAll(ticketQuantity1);
      TicketsSelectionPage.validateSecondTotalForGeneralEvent();
      TicketsSelectionPage.clickConfirmAllButton();
      DeliveryPage.verifyDeliveryPage();
      DeliveryPage.verifyToEmailDeliveryMethodIsAlreadySelected();
      DeliveryPage.enterEmailAddress(userEmail);
      DeliveryPage.clickProceedToCheckout();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      DeliveryPage.clickUserAccountIcon();
      LoginPage.verifyLoginView();
      LoginPage.logInToStore(userEmail,password);
      UserAccountPage.verifyUserIsInMyAccountPage();
      UserAccountPage.verifyUserDetailsInAccountMenu(userName,userEmail)
      UserAccountPage.viewShoppingCart();
      ShoppingCartPage.verifyShoppingCartPage(ticketQuantity1);
      ShoppingCartPage.tickAgreementCheckbox();
      ShoppingCartPage.verifyCorrectTotalIsDisplayedInPayButton();
      ShoppingCartPage.clickPayButton();
      CheckoutPage.verifyOrderCheckoutPage();
      CheckoutPage.verifyDownloadPdfButtonIsPresent();
      CheckoutPage.verifyPrintInvoiceButtonIsPresent();
      CheckoutPage.getInvoiceNo();
      DeliveryPage.clickUserAccountIcon();
      UserAccountPage.navigateToMyTickets();
      UserAccountPage.navigateToTicketHistory();
      CheckoutPage.verifyPurchasedTicketIsInHistory();
    })
  })
})
