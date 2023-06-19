/// <reference types="Cypress" />
let pageHeading = '[class="cart-heading-wrapper"]'
let headingName = 'Tickets selection'
let ticketTypeForEventWithoutHallPlan = '[class="row ng-star-inserted"]'
let ticketTypeForEventWithHallPlan = '[class="row marked ng-star-inserted"]'
let plusButton = '[name="plus"]'
let ticketCount = '[class="tickets-total"]'
let totalSum = '[class="sum-total"]'
let button = 'button'
let findTickets = 'Find tickets'
let cartPreview = 'div'
let previewHeading = 'Seats offered'
let ticketData = '[class="ticket-data-content"]'
let totalItem = '[class="total-item"]'
let itemTickets = ' Tickets:'
let itemSum = ' Total sum:'
let confirmAll = 'Confirm all'
let confirmAllButton = '[class="ng-tns-c35-9"]'
let secondConfirmButton = '[class="controls-wrapper ng-star-inserted"]'
let selectedTicket = '[class="select-value"]'

export class TicketsSelectionPage{
static verifyTicketsSelectionPage(){
  cy.get(pageHeading).contains(headingName).should('be.visible');
}
static addFirstAvailableTicket(){
  cy.get(ticketTypeForEventWithoutHallPlan,{timeout:10000}).parent().find(plusButton).eq(0).click();
}
static selectSectorAndAddTicket(ticketPrice) {
  cy.get(ticketTypeForEventWithHallPlan,{timeout:10000}).contains(ticketPrice,).parent().find(plusButton).click();
}
static pickASeatAndVerifyPickedSeatNumberIsShown(){
  //it selects the first available seat
  cy.get('text[fill="#ffffff"]').first().click({ force: true })
  //TODO
  //   .invoke('text').then((text) => {
  //   let positionElement = '[class="ticket-data-content"]'
  //   cy.get(positionElement).eq(3)
  //     .should(($element) => {
  //       const value = parseInt($element.text());
  //       expect(value).to.equal('text');
  //     })
  // })
}

static verifyAddedTicketsQuantityAndTotalSum(ticketQuantity,totalPrice) {
  cy.get(ticketCount).contains(ticketQuantity);
  cy.get(totalSum).contains(totalPrice);
}
static verifyTicketCount(ticketQuantity) {
  cy.get(ticketCount).contains(ticketQuantity).should('be.visible');
}
static verifyAddedTicketPriceIsCorrect(){
  cy.get(ticketTypeForEventWithoutHallPlan).eq(0).invoke('text')
    .then((text) => {
      const SelectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get(totalSum).invoke('text')
        .then((text) => {
          const totalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
          expect(totalSum).to.equal(SelectedTicketPrice)
        })
    })
}
static clickFindTicketsButton() {
  cy.get(button).contains(findTickets).click();
}
static verifySeatsOfferedViewIsPresent() {
  cy.get(cartPreview).contains(previewHeading).should('be.visible');
}
static verifyRowNumberIsAssigned() {
  cy.get(ticketData).eq(1).should('not.be.empty')
  .invoke('text').should('match', /^\d+$/).should('not.eq', '0');
}
static verifySeatNumberIsAssigned() {
  cy.get(ticketData).eq(2).should('not.be.empty')
  .invoke('text').should('match', /^\d+$/).should('not.eq', '0');
}
static verifyTicketDetailsBeforeConfirmAll(ticketQuantity,totalSum) {
  cy.get(totalItem).eq(0).contains(itemTickets).parent().contains(ticketQuantity);
  cy.get(totalItem).eq(1).contains(itemSum).parent().contains(totalSum);
}
static confirmSelectedTicketDetails(){
  cy.get(selectedTicket).invoke('text')
    .then((text) => {
      const selectedSeatPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get(totalItem).eq(1).invoke('text')
        .then((text) => {
          const totalItem = parseFloat(text.match(/\d+\.\d+/)[0]);
          expect(totalItem).to.equal(selectedSeatPrice)
        })
    })
}
static clickConfirmAllButton() {
  cy.get(button).contains(findTickets).click();
}
static clickSecondConfirmAllButton() {
  cy.get(secondConfirmButton).contains(confirmAll).click();
}


}

