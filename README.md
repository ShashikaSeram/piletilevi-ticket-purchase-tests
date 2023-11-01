# Ticket Purchasing End-to-End Tests

This contains End-to-End Cypress tests for the ticket purchasing flow of Piletilevi main site. These tests are designed to ensure that the ticket purchasing process functions as expected, providing a smooth experience for our users.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#Installation)
- [Running Tests Locally](#running-tests-locally)
- [Folder Structure](#folder-structure)
- [Automated E2E test cases](#automated-E2E-test-cases)

## Prerequisites

Before running the tests, ensure you have the following dependencies installed:

- Node.js (v12 or higher) You can download it from [https://nodejs.org/](https://nodejs.org/)

## Installation

#### 1. Clone the repository to your local machine:
 ```shell
   git clone <repository-url>
   ```
#### 2. Navigate to the repository directory:
 ```shell
   cd shop
   ```
#### 3. Install project dependencies:
 ```shell
   npm install
   ```

## Running Tests Locally
To run the Cypress tests locally, use the following commands:

- #### Open Cypress Test Runner:
```shell
  npx cypress open
  ```
- #### Run all tests headlessly (in the Electron browser):
```shell
  npm run cy:run
  ```
- #### Run in specific browsers
```shell
   npx cypress run --browser chrome
   ```
In the above command you can also change the browser you want to run the tests.

Ex:

--browser firefox

--browser edge

--browser chromium

## Folder Structure
- cypress-e2e - Contains all the Cypress test files 
- e2e - Contains test suites for the ticket purchasing flow
- fixtures - static data used in tests (event data)
- support - includes pages for object model, commands.js, util.js, constants.js files
- cypress.config.js - Cypress configuration file
- package.json - Node.js project configuration file

## Automated E2E test cases
| Test Scenarios                                                                                                               | Status |
|------------------------------------------------------------------------------------------------------------------------------|--------|
| 1. Purchase a ticket without selecting a seat - checks if the user is assigned with a random seat number                     | Done   |
| 2. Purchase a ticket selecting a seat number - checks if the selected seat is offered                                        | Done   |
| 3. Purchase multiple tickets with same price - checks if multiple tickets with same price can be added                       | Done   |
| 4. Purchase multiple tickets with different prices - checks if multiple tickets with different prices can be added           | Done   |
| 5. Purchase a ticket choosing Omniva parcel machine delivery                                                                 | Done   |
| 6. Purchase a ticket choosing Courier within Estonia and Tallinn delivery                                                    | Done   |
| 7. Purchase a ticket choosing International registered mail delivery                                                         | Done   |
| 8. Purchase multiple tickets for different events                                                                            | Done   |
| 9. Purchase a ticket with mandatory personalization                                                                          | Done   |
| 10. Purchase a ticket with optional personalization / skip personalization                                                   | Done   |
| 11. Purchase a ticket with insurance/this event has venue fee + agent fee                                                    | Done   |
| 12. Purchase a ticket for an event with package purchase - checks if one ticket selection adds the whole bulk of tickets     | Done   |
| 13. Purchase a ticket using promo code - validate order checkout page and verify purchased ticket is added to ticket History | Done   |

