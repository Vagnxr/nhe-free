describe('M Play Example', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('REACT_APP_URL'));
  });
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('eq', 'CLARO RVC');
  });
});
