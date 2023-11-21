describe('Note ', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`, {})
      const user = {
        name: 'Stephenie Meyer',
        username: 'stepheniemeyer',
        password: 'twilight'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`, user)
      cy.visit('')
    })
    it('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('stepheniemeyer')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        
        cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Stephenie Meyer logged in')
    })
    it('front page can be opened', function() {
      cy.contains('Notes')
    })
  
    it('login form can be opened', function() {
      cy.contains('log in').click()
      cy.get('#username').type('stepheniemeyer')
      cy.get('#password').type('twilight')
      cy.get('#login-button').click()
  
      cy.contains('Stephenie Meyer logged in')
    })
  
    describe('when logged in', function() {
        describe('and several notes exist', function() {
            beforeEach(function() {
                cy.login({username: 'stepheniemeyer', password: 'twilight'})
                cy.createNote({ content: 'first note', important: false})
                cy.createNote({ content: 'second note', important: false})
                cy.createNote({ content: 'third note', important: false})
              })       
            it('one of those can be made important', function() {
                cy.contains('second note')
                .contains('make important')
                .click()

                cy.contains('second note')
                .contains('make not important')
            }) 
        })
      it('a new note can be created', function() {
        cy.contains('new note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })
  
      describe('and a note exists', function () {
        beforeEach(function () {
          cy.createNote({
            content: 'another note cypress',
            important: true
          })
        })
  
        it('it can be made important', function () {
          cy.contains('another note cypress')
            .contains('make not important')
            .click()
  
          cy.contains('another note cypress')
            .contains('make important')
        })
      })
    })
  })