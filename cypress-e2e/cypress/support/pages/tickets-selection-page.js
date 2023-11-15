/// <reference types="Cypress" />

let pageHeading = '[class="cart-heading-wrapper"]'
let headingName = 'Tickets selection'
let generalEventTicketType = '[class="row ng-star-inserted"]'
let ticketTypeForEventWithHallPlan = '[class="row marked ng-star-inserted"]'
let priceZonePromocode = '[data-cy="price-type-data-0-1"]'
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
let confirmAll = 'Confirm all'
let secondConfirmButton = '[class="controls-wrapper ng-star-inserted"]'
let selectedTicket = '[class="select-value"]'
let offeredTickets = 'app-ticket-data'
let sector = '[class="cdk-row row selectable ng-star-inserted"]'
let packageEvents = '[class="season-events ng-star-inserted"]'
let promoCodeTab = '[placeholder="Enter promo or presale code"]'
let eventInfoTitle = '[class="event-info-title ng-star-inserted"]'

export class TicketsSelectionPage{
 static verifyTicketsSelectionPage(){
   cy.get(pageHeading).contains(headingName).should('be.visible');
 }
 static addTicket(ticketOrder){
   this.waitForText()
   cy.get(plusButton).eq(ticketOrder).click();
 }
 static addTicketByType(ticketOrder) {
   this.waitForText()
   cy.get(ticketTypeForEventWithHallPlan).eq(ticketOrder).children().find(plusButton).click();
 }
 static waitForText(attempt = 0) {
   if (attempt > 5) {   // choose cutoff point, must have this limiter
     throw 'Failed'
   }
   cy.wait(10000);
   cy.get('body').then((body) => {
     if (body.find(plusButton).length === 0) {
       cy.reload();
       cy.log('Reloading attempt : '+ attempt)
       this.waitForText(attempt + 1)
      }
    });
 }
 static verifyTicketCount(ticketQuantity) {
   cy.get(ticketCount).contains(ticketQuantity).should('be.visible');
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
 static verifyTicketCountBeforeConfirmAll(ticketQuantity,totalSum) {
   cy.get(totalItem).eq(0).contains(itemTickets).parent().contains(ticketQuantity);
 }
 static validateFirstTotalForGeneralEvent(){
   cy.get(generalEventTicketType).eq(0).invoke('text')
    .then((text) => {
      const SelectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.wrap(SelectedTicketPrice).as('SelectedTicketPrice');
      cy.get(totalSum).invoke('text')
        .then((text) => {
          const totalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
          expect(totalSum).to.equal(SelectedTicketPrice)
          cy.wrap(totalSum).as('firstTotalForGeneralEvent');
        })
    })
 }
 static validateSecondTotalForGeneralEvent() {
   cy.get(selectedTicket).invoke('text')
    .then((text) => {
      const ticketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get(totalItem).eq(1).invoke('text')
        .then((text) => {
          const secondTotalPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
          cy.get('@firstTotalForGeneralEvent').then((firstTotalForGeneralEvent) => {
            expect(firstTotalForGeneralEvent).to.equal(secondTotalPrice)
            cy.get('@SelectedTicketPrice').then(SelectedTicketPrice => {
            expect(ticketPrice).to.equal(SelectedTicketPrice)
            })
          })
        })
    })
 }
 static clickFindTicketsButton() {
   cy.get(button).contains(findTickets).click();
 }
 static clickConfirmAllButton() {
   cy.get(secondConfirmButton).contains(confirmAll).click();
 }
 static addSecondTicketAndVerifyPriceForTwo(ticketOrder) {
   var priceOfTicket;
   var priceOfTwo;
   //Get the text content of the price element and extract the numerical value
   cy.get(totalSum).invoke('text').then((text) => {
    priceOfTicket = parseFloat(text.match(/\d+\.\d+/)[0]);
   });
   //add the second ticket
   this.addTicket(ticketOrder);
   //validate if the total price is calculated correctly
   cy.get(totalSum).invoke('text').then((text) => {
    priceOfTwo = parseFloat(text.match(/\d+\.\d+/)[0]);
    expect(priceOfTwo).to.equal(2 * priceOfTicket);
    //Wrap priceOfTwo to create a chainable object that can be passed to other Cypress commands
    cy.wrap(priceOfTwo).as('priceOfTwo');
  });
 }
 static confirmTotalPriceForTwo() {
   cy.get(totalItem).eq(1).invoke('text')
    .then((text) => {
      const totalPriceForTwo = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get('@priceOfTwo').then((priceOfTwo) => {
        expect(priceOfTwo).to.equal(totalPriceForTwo)
   })
  })
 }
 static verifySeatsDetailForMultipleTickets() {
   cy.get(offeredTickets).should('have.length',2);
   cy.get(ticketData).should('have.length',6).should('not.be.empty');
   cy.get(ticketData).then(seatInfo => {
    cy.wrap(seatInfo[1]).invoke('text').should('match', /^\d+$/).should('not.eq', '0');
    cy.wrap(seatInfo[2]).invoke('text').should('match', /^\d+$/).should('not.eq', '0');
    cy.wrap(seatInfo[4]).invoke('text').should('match', /^\d+$/).should('not.eq', '0');
    cy.wrap(seatInfo[5]).invoke('text').should('match', /^\d+$/).should('not.eq', '0');
  })
 }
 static selectFirstSector(){
   cy.get(sector).eq(0).click();
 }
 static validateFirstTotalForEventWithSeatPlan(){
   cy.get(ticketTypeForEventWithHallPlan).eq(0).invoke('text')
    .then((text) => {
      const SelectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get(totalSum).invoke('text')
        .then((text) => {
          const totalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
          cy.wrap(totalSum).as('firstTotalSum')
          expect(totalSum).to.equal(SelectedTicketPrice)
        })
    })
 }
  static validateSecondTotalForEventWithSeatPlan() {
   cy.get(totalItem).eq(1).invoke('text')
    .then((text) => {
      const secondTotalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get('@firstTotalSum').then((firstTotalSum) => {
        expect(firstTotalSum).to.equal(secondTotalSum)
      })
    })
 }
 static validateFirstTotalForTwoTickets() {
   cy.get(ticketTypeForEventWithHallPlan).eq(0).invoke('text')
    .then((text) => {
      const firstTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get(ticketTypeForEventWithHallPlan).eq(1).invoke('text')
        .then((text) => {
          const secondTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
          cy.get(totalSum).invoke('text').then((text) => {
            const totalPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
            expect(totalPrice).to.equal(firstTicketPrice + secondTicketPrice);
            cy.wrap(totalPrice).as('firstTotalForTwoTickets')
          })
        })
    })
 }
 static validateSecondTotalForTwoTickets() {
   cy.get(totalItem).eq(1).invoke('text')
    .then((text) => {
      const totalPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get('@firstTotalForTwoTickets').then((firstTotalForTwoTickets) => {
        expect(firstTotalForTwoTickets).to.equal(totalPrice)
      })
    })
 }
 static verifyTotalForPackageTickets(){
   cy.get(ticketTypeForEventWithHallPlan).eq(0).invoke('text')
     .then((text) => {
       const ticketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
        cy.get(totalSum).invoke('text')
          .then((text) => {
            const totalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
            cy.wrap(totalSum).as('totalForPackageTickets')
            expect(totalSum).to.equal(3 * ticketPrice)
          })
     })
 }
 static validateTotalForTicketsPickedFromVenueMap() {
   cy.get(selectedTicket).invoke('text')
     .then((text) => {
       const selectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
   cy.get(totalItem).eq(1).invoke('text')
     .then((text) => {
       const totalPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
         expect(totalPrice).to.equal(selectedTicketPrice)
       })
     })
 }
 static verifyOtherPackageTicketsAvailable(ticketCount) {
   cy.get(packageEvents).children('app-event').should('have.length',ticketCount);
 }
 static pickASeatAndVerifyPickedSeatNumberIsShown() {
    //it selects the first available seat
  cy.get('text[fill="#ffffff"]').first().click({ force: true })
 }
 static verifyCorrectEventIsShown(eventName){
   cy.get(eventInfoTitle).contains(eventName).should('be.visible');
 }
 static enterAndSubmitPromoCode(promoCode){
   cy.get(promoCodeTab).click().type(promoCode,{delay: 50});
   //cy.get(button).contains('Submit').should('not.be.disabled');
   cy.get(button).contains('Submit').click({ force: true });
 }
 static verifyPromoCodeIsAppliedSuccessfully(){
  cy.wait(5000);
   cy.get(button).contains('Change').should('be.visible');
 }
 static addTicketAppliedPromocode() {
   this.waitForText()
   cy.get(priceZonePromocode).children().find(plusButton).click();
 }
 static validateFirstTotalForPromoTicket(){
   cy.get(priceZonePromocode).invoke('text')
     .then((text) => {
       const SelectedTicketPrice = parseFloat(text.match(/\d+\.\d+/)[0]);
       cy.wrap(SelectedTicketPrice).as('SelectedTicketPrice');
       cy.get(totalSum).invoke('text')
         .then((text) => {
           const totalSum = parseFloat(text.match(/\d+\.\d+/)[0]);
           expect(totalSum).to.equal(SelectedTicketPrice)
           cy.wrap(totalSum).as('firstTotalForGeneralEvent');
         })
     })
 }
}

