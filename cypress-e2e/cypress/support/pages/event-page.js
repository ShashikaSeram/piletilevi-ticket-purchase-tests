/// <reference types="Cypress" />
let eventTitle = '[class="event_short_title"]'
let eventDetails = '[class="concert_details_spec_content"]'
let buyButton = '[class="buy_button_text"]'
export class EventPage{
static clickOnSearchedEvent(eventName){
  cy.get(eventTitle).contains(eventName).should('be.visible').click();
}
static verifySelectedEventIsCorrect(venue){
  cy.get(eventDetails).contains(venue).should('be.visible');
}
static clickBuyButton(){
  cy.get(buyButton).first().click();
}







}
