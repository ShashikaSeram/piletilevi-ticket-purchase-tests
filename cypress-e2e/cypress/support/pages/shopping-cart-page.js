/// <reference types="Cypress" />

import { TIMEOUT_SHORT } from '../constants'

let pageHeading = '[class="cart-heading-wrapper ng-star-inserted"]'
let headingName = 'Shopping cart'
let numberOfTicketsAdded = '[class="cart-counter"]'
let label = 'label'
let paymentMethods = '[class="payment-methods-wrapper"]'
let availablePaymentMethods = 'payment-method ng-star-inserted'
let visaPayment = '[id="payment605"]'
let agreementCheckbox  = '[id="agreement-checkbox"]'
let payButton = '[data-cy="pay-button"]'
let addInsuranceToAllButton = '[spinnername="insuranceEnable"]'
let eventCard = 'app-checkout-event'
let ticketCard = 'app-checkout-ticket'
let priceSummaryViewBox = '[class="mark clickable"]'
let summaryValue = '[class="summary-value"]'
let checkbox = '[type="checkbox"]'
let insurancePrice = '[class="insurance-price"]'
let removeButton = 'app-remove-button'

export class ShoppingCartPage{
 static verifyShoppingCartPage(ticketQuantity){
  cy.get(pageHeading).contains(headingName).should('be.visible');
  cy.get(numberOfTicketsAdded).contains(ticketQuantity);
 }
 static verifyAddInsuranceIsAvailable() {
  cy.get(label).contains('Add insurance').should('be.visible');
 }
 static clickAddInsuranceButton() {
   cy.get(checkbox).eq(0).check();
 }
 static verifyAddInsuranceIsChangedToRemoveInsurance(){
   cy.get(label).contains('Remove insurance').should('be.visible');
 }
 static verifyAddInsuranceToAllIsAvailable() {
  cy.get(addInsuranceToAllButton).should('be.visible');
 }
 static clickAddInsuranceToAllButton() {
  cy.get(addInsuranceToAllButton).should('be.visible').click();
 }
 static verifyBothPaymentMethodsAreDisplayed() {
  cy.get(paymentMethods).children().should('have.class',availablePaymentMethods).and('have.length',2);
 }
 static selectVisaPaymentMethod(){
  cy.get(visaPayment).click( {force: true});
 }
 static tickAgreementCheckbox() {
  cy.get(agreementCheckbox).check();
 }
 static verifySelectedEventsAreDisplayedInShoppingCart() {
  cy.get(eventCard).should('have.length',2);
 }
 static verifyMultipleTicketsAreDisplayedInShoppingCart(ticketCount) {
   cy.get(ticketCard).should('have.length',ticketCount);
 }
 static verifyTotalPriceIsCalculatedCorrectly() {
  cy.get(priceSummaryViewBox).click({timeout:TIMEOUT_SHORT});
  cy.get(summaryValue).eq(0).invoke('text').as('expectedTotalPrice')
  cy.get(summaryValue).eq(1).invoke('text').as('subtotal')
  cy.get(summaryValue).eq(2).invoke('text').as('ticketingServiceFee')
  cy.get(summaryValue).eq(3).invoke('text').as('insuranceFee')

  cy.get('@subtotal').then(subtotal => {
    cy.get('@ticketingServiceFee').then(ticketingServiceFee => {
      cy.get('@insuranceFee').then(insuranceFee => {
        const totalPrice = parseFloat(subtotal) + parseFloat(ticketingServiceFee) + parseFloat(insuranceFee);
        cy.get('@expectedTotalPrice').then(expectedTotalPrice => {
          expect(parseFloat(expectedTotalPrice)).to.equal(totalPrice);
        })
      })
    })
  })
 }
 static verifyTotalPriceIsCalculatedIncludingTheDeliveryCost() {
  cy.get(priceSummaryViewBox).click({timeout:TIMEOUT_SHORT});
  cy.get(summaryValue).eq(0).invoke('text').as('expectedTotalPrice')
  cy.get(summaryValue).eq(1).invoke('text').as('subtotal')
  cy.get(summaryValue).eq(2).invoke('text').as('ticketingServiceFee')
  cy.get(summaryValue).eq(3).invoke('text').as('insuranceFee')
  cy.get(summaryValue).eq(4).invoke('text').as('deliveryType')

  cy.get('@subtotal').then(subtotal => {
    cy.get('@ticketingServiceFee').then(ticketingServiceFee => {
      cy.get('@insuranceFee').then(insuranceFee => {
        cy.get('@deliveryType').then(deliveryType => {
          expect(parseFloat(deliveryType)).not.equal(0); //confirm delivery fee is assigned
          const totalPrice = parseFloat(subtotal) + parseFloat(ticketingServiceFee) + parseFloat(insuranceFee) + parseFloat(deliveryType);
          cy.get('@expectedTotalPrice').then(expectedTotalPrice => {
            expect(parseFloat(expectedTotalPrice)).to.equal(totalPrice);
          })
        })
      })
    })
  })
 }
 static verifyTotalPriceIsCalculatedWithAdditionalFees() {
   cy.get(insurancePrice).invoke('text').as('insurancePrice')
   cy.get(priceSummaryViewBox).click({timeout:TIMEOUT_SHORT});
   cy.get(summaryValue).eq(0).invoke('text').as('expectedTotalPrice')
   cy.get(summaryValue).eq(1).invoke('text').as('subtotal')
   cy.get(summaryValue).eq(2).invoke('text').as('venueServiceFee')
   cy.get(summaryValue).eq(3).invoke('text').as('agentFee')
   cy.get(summaryValue).eq(4).invoke('text').as('ticketingServiceFee')
   cy.get(summaryValue).eq(5).invoke('text').as('insuranceFee')

   cy.get('@subtotal').then(subtotal => {
     cy.get('@venueServiceFee').then(venueServiceFee => {
       expect(parseFloat(venueServiceFee)).not.equal(0); //confirm venue fee is assigned
        cy.get('@agentFee').then(agentFee => {
          expect(parseFloat(agentFee)).not.equal(0); //confirm agent fee is assigned
           cy.get('@ticketingServiceFee').then(ticketingServiceFee => {
             expect(parseFloat(ticketingServiceFee)).not.equal(0); //confirm ticketing service fee is assigned
              cy.get('@insurancePrice').then(insurancePrice => {
                cy.get('@insuranceFee').then(insuranceFee => {
                  expect(parseFloat(insurancePrice)).to.equal(parseFloat(insuranceFee)); //confirm correct insurance fee is assigned
                   const totalPrice = parseFloat(subtotal) + parseFloat(venueServiceFee) + parseFloat(agentFee) + parseFloat(ticketingServiceFee) + parseFloat(insuranceFee);
                   cy.get('@expectedTotalPrice').then(expectedTotalPrice => {
                     expect(parseFloat(expectedTotalPrice)).to.equal(totalPrice);
                   })
                })
              })
           })
        })
     })
   })
 }
 static verifyCorrectTotalIsDisplayedInPayButton(){
   cy.get(summaryValue).invoke('text')
     .then((text) => {
       const subtotalInSummary = parseFloat(text.match(/\d+\.\d+/)[0]);
       cy.get(payButton).invoke('text')
         .then((text) => {
           const subtotalInPay = parseFloat(text.match(/\d+\.\d+/)[0]);
           expect(subtotalInPay).to.equal(subtotalInSummary);
         })
     })
 }
 static clickPayButton() {
   cy.get(payButton).click();
 }
 static removeSelectedTicket(){
   cy.get(removeButton).click();
 }

}
