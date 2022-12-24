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
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypressTest')
      cy.get('#password').type('cypress')
      cy.get('#login-button').click()
      cy.contains('Cypress Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('userDoesNotExist')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.get('html').should('not.contain', 'Ata Metin Türetken logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypressTest', password: 'cypress' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Learn Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('dummy url')
      cy.get('#createButton').click()
      cy.contains('Learn Cypress')
    })
  })
})
