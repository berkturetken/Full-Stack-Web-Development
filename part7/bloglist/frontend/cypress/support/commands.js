Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:8080/api/login', {
    username,
    password,
  }).then(({ body }) => {
    console.log('hello')
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: 'http://localhost:8080/api/blogs',
    method: 'POST',
    body: { title: title, author: author, url: url, likes: likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})
