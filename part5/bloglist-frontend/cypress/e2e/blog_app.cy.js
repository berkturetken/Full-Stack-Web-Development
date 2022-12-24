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
    const newBlog = {
      title: 'Learn Cypress',
      author: 'Cypress',
      url: 'dummy url'
    }
    beforeEach(function () {
      cy.login({ username: 'cypressTest', password: 'cypress' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#createButton').click()
      cy.contains(newBlog.title)
    })

    it('A user can like a blog', function () {
      cy.createBlog({ title: newBlog.title, author: newBlog.author, url: newBlog.url })
      cy.get('#viewHideButton').click()
      cy.contains(0)
      cy.get('#likeButton').click()
      cy.contains(1)
      cy.contains('increased the like of blog ' + newBlog.title + ' by ' + newBlog.author)
    })
  })
})
