/// <reference types="Cypress" />

let logo = 'img[alt="logo"]'
let firstModuleHeading = '[class="content_module_heading"]'
let headingName = 'Events TOP'
let searchButton = '[name="search"]'
let allTab = '[data-target-id="1089"]'
let userAccountIcon = '[class="user-account-icon"]'

export class HomePage{
  static setCookieConsent() {
    const COOKIE_NAME = "CookieConsent";
    const COOKIE_VALUE = "ACCEPTED";
    Cypress.on("window:before:load", window => {
      window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
    });
  }
  static authorizeHelmsStore(){
    cy.visit('/', {
      auth: {
        username: 'tester',
        password: 'protect',
      },
      headers: {
        authorization: 'Basic dGVzdGVyOnByb3RlY3Q=',
      },
    })
  }
  static navigateToHomePage(){
    cy.origin(Cypress.env('portal_host'), () => {
      cy.visit(Cypress.env('portal_url'), {
        auth: {
          username: 'tester',
          password: 'protect',
        }
      })
    })
  }
  static navigateToEventWithPromoCode(){
    cy.visit(Cypress.env('eventPromo_url'), {
      auth: {
        username: 'tester',
        password: 'protect',
      },
    })
  }
  static verifyHomePage(){
    cy.get(logo).scrollIntoView().should('be.visible');
    cy.get(firstModuleHeading).contains(headingName).should('be.visible');
  }
  static searchEventByName(eventName){
    cy.wait(2000)
    cy.get(searchButton).click({ force: true }).type(eventName)
      .should('have.value',eventName);
  }
  static navigateToAllTab(){
    cy.get(allTab).click();
  }
  static clickUserAccountIcon(){
    cy.get(userAccountIcon).eq(0).click();
  }
}
