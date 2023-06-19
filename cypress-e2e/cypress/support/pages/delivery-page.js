/// <reference types="Cypress" />
let span = 'span'
let headingName = 'Send ticket'
let toEmailButton = '[id="mat-tab-label-2-0"]'
let toParcelMachineButton = '[id="mat-tab-label-2-1"]'
let omnivaParcelMethod = '[id="accordion-header-266"]'
let courierWithinEstonia = '[id="accordion-header-80"]'
let internationalPostDelivery = '[id="accordion-header-81"]'
let emailField = '[placeholder="E-mail"]'
let firstNameField = '[placeholder="First name"]'
let lastNameField = '[placeholder="Last name"]'
let remarksField = '[placeholder="Remarks"]'
let phoneNumberField = '[placeholder="Phone"]'
let addressField = '[placeholder="Address"]'
let cityField = '[placeholder="City/Town"]'
let postalCodeField = '[placeholder="Postal code"]'
let regionField = '[placeholder="County/Region"]'
let button = 'button'
let checkoutButton = 'Proceed to checkout'
let selectedCountryValue = '[class="select-value"]'
let dropDownList = '[class="dropdown-list dropdown-open"]'
export class DeliveryPage{
  static verifyDeliveryPage() {
    cy.get(span).contains(headingName).should('be.visible');
  }
  static verifyToEmailDeliveryMethodIsAlreadySelected() {
    cy.get(toEmailButton).should('have.attr','aria-selected','true');
  }
  static selectToParcelMachineDeliveryMethod() {
    cy.get(toParcelMachineButton).click();
  }
  static verifyOmnivaDeliveryIsAlreadySelected(){
    cy.get(omnivaParcelMethod).should('have.attr','aria-expanded','true');
  }
  static enterEmailAddress(email) {
    cy.get(emailField).type(email);
  }
  static enterName(firstName,lastName) {
    cy.get(firstNameField).type(firstName);
    cy.get(lastNameField).type(lastName);
  }
  static addRemarks(remarks) {
    cy.get(remarksField).type(remarks);
  }
  static enterPhoneNumber(phoneNumber) {
    cy.get(phoneNumberField).type(phoneNumber);
  }
  static chooseFirstParcelMachine(parcelMachineName) {
    cy.get(button).contains('Choose parcel machine').click();
    cy.get(dropDownList).contains(parcelMachineName).click();
  }
  static enterAddressDetails(deliveryAddress,cityName,postalCode,regionName){
    cy.get(addressField).type(deliveryAddress)
    cy.get(cityField).type(cityName)
    cy.get(postalCodeField).type(postalCode)
    cy.get(regionField).type(regionName)
  }
  static selectCountryName() {
    cy.get(selectedCountryValue).contains('Estonia').click();
    cy.get(dropDownList).contains('Finland').click();
  }
  static clickProceedToCheckout() {
    cy.get(button).contains(checkoutButton).click();
  }
  static selectAndVerifyCourierWithinEstoniaDelivery(){
    cy.get(courierWithinEstonia).click()
    cy.get(courierWithinEstonia).should('have.attr','aria-expanded','true');
  }
  static selectAndVerifyInternationalPostDelivery(){
    cy.get(internationalPostDelivery).click()
    cy.get(internationalPostDelivery).should('have.attr','aria-expanded','true');
  }
  static getOmnivaDeliveryCost(){
    cy.get('class="ng-star-inserted"').contains('Omniva parcel machine').invoke('text')
      .then((text) => {
        let deliveryCost;
        deliveryCost = parseFloat(text.match(/\d+\.\d+/)[0]);
        return deliveryCost;
  })
  }


  }
