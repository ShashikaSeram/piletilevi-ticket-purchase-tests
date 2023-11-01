/// <reference types="Cypress" />

let button = 'button'
let loginButton = '[class="mdc-tab__text-label"]'
let createAccountButton = '[class="mdc-tab__text-label"]'
let emailTab = '[placeholder="E-mail"]'
let userPassword = '[placeholder="Password"]'

export class LoginPage{
  static verifyLoginView(){
    cy.get(loginButton).eq(0).contains('Log in').should('be.visible');
    cy.get(createAccountButton).eq(1).contains('Create account').should('be.visible');
    cy.get(button).contains('Log in').should('be.visible');
  }
  static enterLoginDetails(userEmail,password){
    cy.get(emailTab).type(userEmail);
    cy.get(userPassword).type(password);
  }
  static clickLogInButton(){
    cy.get(button).contains('Log in').click();
  }
  static logInToStore(userEmail,password){
    this.enterLoginDetails(userEmail,password);
    this.clickLogInButton();
  }
}
