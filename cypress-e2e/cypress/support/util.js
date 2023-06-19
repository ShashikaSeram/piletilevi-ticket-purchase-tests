export class Utils{
  static handleUncaughtExceptions(){
    Cypress.on('uncaught:exception', () => false);
  }
}
