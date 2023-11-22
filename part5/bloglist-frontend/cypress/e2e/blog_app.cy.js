describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Stephenie Meyer',
      username: 'stepheniemeyer',
      password: 'twilight'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })
  it('login form is shown', function() {
    cy.contains('log in to application')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('stepheniemeyer')
      cy.get('input:last').type('twilight')
      cy.get('#login-button').click()
      cy.contains('Stephenie Meyer logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('stepheniemeyer')
      cy.get('input:last').type('nottwilight')
      cy.get('#login-button').click()
      cy.get('.error')
      .should('contain', 'wrong username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'stepheniemeyer', password: 'twilight'})
    })
    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('old moon')
      cy.get('#author').type('Stephenie Meyer')
      cy.get('#url').type('twilight.com')
      cy.get('#create-button').click()
      cy.contains('old moon Stephenie Meyer')
    })
    describe('interacting with blog', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('old moon')
        cy.get('#author').type('Stephenie Meyer')
        cy.get('#url').type('twilight.com')
        cy.get('#create-button').click()
      })
      it('it can be liked', function() {
        cy.contains('View').click()
        cy.contains('like').click()
        cy.get('.likes').should('contain', 1)
      })
      it('it can be deleted', function() {
        cy.contains('View').click()
        cy.contains('delete').click()
      })
      it('blog display with most liked first', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('new moon')
        cy.get('#author').type('Stephenie Meyer')
        cy.get('#url').type('twilight.com')
        cy.get('#create-button').click()
        cy.contains('View').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.reload()
        cy.get('.blog').eq(0).should('contain', 'new moon')
        cy.get('.blog').eq(1).should('contain', 'old moon')
      })
    })
  }) 
})