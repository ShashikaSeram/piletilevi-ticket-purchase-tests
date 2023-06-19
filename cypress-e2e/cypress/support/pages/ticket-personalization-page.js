/// <reference types="Cypress" />
let pageHeading = '[class="cart-heading-wrapper"]'
let headingName = 'Personalization of tickets'
let personalDetails = '[placeholder="Name, Surname"]'
let checkbox = '[type="checkbox"]'
let button = 'button'
let nextButton = 'Next'
let skipPersonalizationButton = 'Skip personalization'

export class TicketPersonalizationPage{
  static verifyPersonalizationPage(){
    cy.get(pageHeading).contains(headingName).should('be.visible');
  }
static enterName(ownerName) {
    cy.get(personalDetails).type(ownerName);
}
static tickCheckBox() {
    cy.get(checkbox).check();
}
static clickNextButton() {
    cy.get(button).contains(nextButton).click();
}
static skipPersonalization(){
   cy.get(button).contains(skipPersonalizationButton).click();
   cy.get('[class="mat-dialog-title"]').contains('Do you wish to proceed?').should('be.visible');
   cy.get(button).contains('Proceed to payment').click();
}



}
