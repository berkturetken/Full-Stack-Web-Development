describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const user = {
      name: 'Cypress Test User',
      username: 'cypressTest',
      password: 'cypress',
    }
    cy.request('POST', 'http://localhost:8080/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it.only('succeeds with correct credentials', function () {
      cy.get('#username').type('cypressTest')
      cy.get('#password').type('cypress')
      cy.get('#login-button').click()
      cy.contains('Cypress Test User logged in')
    })

    it.only('fails with wrong credentials', function () {
      cy.get('#username').type('userDoesNotExist')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.get('html').should('not.contain', 'Ata Metin Türetken logged in')
    })
  })
})
