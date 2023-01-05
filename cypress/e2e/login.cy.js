/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display logout button when login success
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    // verify element that need to be displayed on login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // click login button without filling email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window.alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // filling username
    cy.get('input[placeholder="Email"]').type('test@test.com');

    // click login button without filling password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window.alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email or password is wrong', () => {
    // filling email
    cy.get('input[placeholder="Email"]').type('test@test.com');

    // filling wrong password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // click login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window.alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display logout button when login success', () => {
    // filling email
    cy.get('input[placeholder="Email"]').type('test@test.com');

    // filling password
    cy.get('input[placeholder="Password"]').type('test123');

    // click login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify login success
    cy.get('button')
      .contains(/^Logout$/)
      .should('be.visible');
  });
});
