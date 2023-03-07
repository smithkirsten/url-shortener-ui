describe('Landing page of App', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'urls.json'})
    cy.visit('http://localhost:3000/')
  })
  it('Displays the title', () => {
    cy.get('h1').should('contain', 'URL Shortener')
  })

  it('Displays all urls', () => {
   
  })

  it('Displays the input form', () => {
   
  })

  it('Should display new post after it is submitted', () => {
   
  })
})