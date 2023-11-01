/// <reference types="Cypress" />

let pageHeading = 'div'
let sideMenuButton = '[class="list-item ng-star-inserted"]'
let userNameField = '[class="account-side-menu-account-name"]'
let userEmailField = '[class="account-side-menu-account-email"]'
let shoppingCartButton = '[class="basket_status active"]'
let ticketViewTab = '[class="mdc-tab__text-label"]'
export class UserAccountPage{
  static verifyUserIsInMyAccountPage(){
    cy.get(pageHeading).contains('My settings').should('be.visible');
    cy.get(sideMenuButton).contains('My account').should('have.class', 'list-link list-link-active');
  }
  static verifyUserDetailsInAccountMenu(userName,userEmail){
    cy.get(userNameField).should('contain', userName);
    cy.get(userEmailField).should('contain', userEmail);
  }
  static viewShoppingCart(){
    cy.get(shoppingCartButton).eq(0).click();
  }
  static navigateToMyTickets(){
    cy.get(sideMenuButton).contains('My tickets').click();
  }
  static navigateToTicketHistory() {
    cy.get(ticketViewTab).contains('History').click();
  }
}
