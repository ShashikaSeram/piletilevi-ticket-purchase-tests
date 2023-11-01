/// <reference types="Cypress" />

let eventTitle = '[class="event_short_title"]'
let eventDetails = '[class="concert_details_summary_title"]'
let buyButton = '[class="buy_button_text"]'
let subTicket = '[class="event_short event"]'

export class EventPage{
  static clickOnSearchedEvent(eventName){
  cy.get(eventTitle).contains(eventName).should('be.visible').click();
  }
  static verifySelectedEventIsCorrect(eventName){
  cy.get(eventDetails).should('contain',eventName);
  }
  static clickBuyButton(){
  cy.get(buyButton).first().click({force:true});
  }
  static selectFirstAvailableSubTicket() {
  cy.get(subTicket).eq(0).click();
  }

}
