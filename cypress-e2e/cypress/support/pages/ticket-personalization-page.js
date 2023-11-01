/// <reference types="Cypress" />

let pageHeading = '[class="cart-heading-wrapper"]'
let headingName = 'Personalization of tickets'
let personName = '[placeholder="Name, Surname"]'
let personPhoneNumber = '[placeholder="Phone number"]'
let personEmail = '[placeholder="E-mail address"]'
let checkbox = '[type="checkbox"]'
let button = 'button'
let nextButton = 'Next'
let skipPersonalizationButton = 'Skip personalization'
let verificationDialogBox = '[class="mat-mdc-dialog-title mdc-dialog__title"]'

export class TicketPersonalizationPage{
  static verifyPersonalizationPage(){
    cy.get(pageHeading).contains(headingName).should('be.visible');
  }
  static enterPersonalDetails(name,phoneNumber,email) {
    cy.get(personName).type(name);
    cy.get(personPhoneNumber).type(phoneNumber)
    cy.get(personEmail).type(email)
  }
  static tickCheckBox() {
    cy.get(checkbox).check();
  }
  static clickNextButton() {
    cy.get(button).contains(nextButton).click();
  }
  static skipPersonalization(){
    cy.get(button).contains(skipPersonalizationButton).click();
    cy.get(verificationDialogBox).contains('Do you wish to proceed?').should('be.visible');
    cy.get(button).contains('Proceed to payment').click();
  }
}
