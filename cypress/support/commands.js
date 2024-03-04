Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.visit ('./src/index.html')
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value','Ana Paula')
    cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value','Medeiros')
    cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value','anapmedeiros@gmail.com')  
    cy.get('#phone').should('be.visible').type('11965451947').should('have.value','11965451947')
    cy.get('#open-text-area').should('be.visible').type('teste')
    cy.contains('button','Enviar').click()
   
})