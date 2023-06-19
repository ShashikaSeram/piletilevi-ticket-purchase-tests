/// <reference types="Cypress" />

let pageHeading = '[class="cart-heading-wrapper ng-star-inserted"]'
let headingName = 'Shopping cart'
let numberOfTicketsAdded = '[class="cart-counter"]'
let label = 'label'
let addInsuranceToTicket = 'Add insurance'
let paymentMethods = '[class="payment-methods-wrapper"]'
let availablePaymentMethods = 'payment-method ng-star-inserted'
let visaPayment = '[id="payment605"]'
let agreementCheckbox  = '[id="agreement-checkbox"]'
let payButton = 'app-purchase-button'
export class ShoppingCartPage{
  static verifyShoppingCartPage(ticketQuantity){
    cy.get(pageHeading).contains(headingName).should('be.visible');
    cy.get(numberOfTicketsAdded).contains(ticketQuantity);
  }
static verifyAddInsuranceIsAvailable() {
    cy.get(label).contains(addInsuranceToTicket).should('be.visible');
}
static clickShoppingCartSummaryInfoButton() {
  cy.get('[class="info-tooltip"]').eq(1).click({force:true});
  cy.get('[class="info-tooltip"]').eq(1).trigger('mouseenter')
}
//TODO does not locate the elements inside info tab
static verifyTotalPriceIsCalculatedCorrectlyForParcelMethod(ticketPrice,deliveryCost) {
    // cy.get('app-info-tool-tip-content').should('be.visible')
  cy.log(deliveryCost)

  // cy.get('[class="select-value"]').eq(4).invoke('text')
  //   .then((text) => {
  //     const selectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
  //     cy.get(totalItem).eq(0).invoke('text')
  //       .then((text) => {
  //         const totalPriceForSelectedTickets = parseFloat(text.match(/\d+\.\d+/)[0]);
  //         expect(totalPriceForSelectedTickets).to.equal(selectedTicketPrice)
  //       })
  //   })
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
static clickPayButton(ticketPrice) {
    cy.get(payButton).contains(`Pay ${ticketPrice}`).click();
}



}
