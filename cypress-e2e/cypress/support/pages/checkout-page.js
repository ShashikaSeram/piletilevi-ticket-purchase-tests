/// <reference types="Cypress" />

let pageHeading = '[class="order-confirmation-heading"]'
let headingName = 'Order checkout'
let ticketViewButton = 'app-ui-button'
let transactionItem = 'app-transaction-item'
let pdfButton = '[class="button-link ng-tns-c10-5 ng-star-inserted"]'

export class CheckoutPage {
  static verifyOrderCheckoutPage() {
    cy.get(pageHeading).contains(headingName).should('be.visible');
  }
  static verifyDownloadPdfButtonIsPresent(){
    cy.get(ticketViewButton).eq(0).contains('Download PDF ticket').should('be.visible');
  }
  static verifyPrintInvoiceButtonIsPresent(){
    cy.get(ticketViewButton).eq(1).contains('Print invoice').should('be.visible');
  }
  static getInvoiceNo(){
    cy.get(pdfButton).invoke('attr','href').then((href) => {
      if (href.includes('fnr=')) {
        // Extract the fnr value from the href
        const fnrValue = new URL(href).searchParams.get('fnr');
        cy.log(`The Invoice number is: ${fnrValue}`);
        cy.wrap(fnrValue).as('fnrValue');
      } else {
        cy.log('The href does not contain invoice number');
      }
    })
  }
  static verifyPurchasedTicketIsInHistory(){
    cy.get('@fnrValue').then((fnrValue) => {
      cy.get(transactionItem).contains(fnrValue).should('be.visible')
    });
  }
}
