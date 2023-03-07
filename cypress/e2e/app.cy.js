describe('Landing page of App', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'urls.json' })
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        "id": 3,
        "title": "big snail",
        "long_url": "https://c8.alamy.com/comp/CB9MBD/small-snail-riding-on-top-of-the-house-of-a-large-snail-CB9MBD.jpg"
      },
      response: { fixture: 'newUrls.json' }
    }).as('postCheck')

  })
  it('Displays the title', () => {
    cy.get('h1').should('contain', 'URL Shortener')
  })

  it('Displays all urls', () => {
   cy.get('.url').should('have.length', 2)
   cy.get('#1')
    .should('contain', 'snails')
    .should('contain', "https://www.animal-ethics.org/wp-content/uploads/snails-and-bivalves.jpg")
    .should('contain', "http://localhost/shorter-snails")
   cy.get('#2')
    .should('contain', 'Just one snail')
    .should('contain', "https://assets.answersingenesis.org/img/cms/content/contentnode/og_image/snails-slugs-and-semi-slugs.jpg")
    .should('contain', "http://localhost/smaller-snail")
  })

  it('Displays the input form', () => {
   cy.get('input').should('have.length', 2)
   cy.get('[placeholder="Title..."]').should('be.visible')
   cy.get('[placeholder="URL to Shorten..."]').should('be.visible')
   cy.get('button').should('be.visible')
   
  })

  it('Should display new post after it is submitted', () => {
    cy.get('input').eq(0).type('big snail')
    cy.get('input').eq(1).type('https://c8.alamy.com/comp/CB9MBD/small-snail-riding-on-top-of-the-house-of-a-large-snail-CB9MBD.jpg')
    cy.get('button').click()

    cy.wait('@postCheck')
    
    cy.get('#3')
      .should('be.visible')
      .should('contain', 'big snail')
  })
})