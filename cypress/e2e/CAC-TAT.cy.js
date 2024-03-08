/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function () {

        const longText = 'Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico,Teste Automatizado Cypress Básico'

        cy.clock()

        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#phone').should('be.visible').type('11965451947').should('have.value', '11965451947')
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })


    it('Exibe mensagem de erro ao submeter o formulário xom um email com formatação inválida', function () {
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmailcom').should('have.value', 'anapmedeiros@gmailcom')
        cy.get('#phone').should('be.visible').type('11965451947').should('have.value', '11965451947')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Inserir caracteres não numérico no campo telefone', function () {
        cy.clock()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#phone').should('be.visible').type('aaaa').should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()
        

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido anter do envio do formulário', function () {
        cy.clock()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#phone-checkbox').should('be.visible').click()
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
   
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })



    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.clock()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone-checkbox').should('be.visible').click()
        cy.get('#phone').type('11966989898').should('have.value', '11966989898')
        cy.get('#phone').clear().should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()
        cy.get(':nth-child(2) > :nth-child(2) > label').should('contain', 'obrigatório')
        cy.get('.error').should('be.visible')
   
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
   
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
   
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()

    })
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#product').select(1).should('have.value', 'blog')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()

    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').should('be.visible').type('Ana Paula').should('have.value', 'Ana Paula')
        cy.get('#lastName').should('be.visible').type('Medeiros').should('have.value', 'Medeiros')
        cy.get('#email').should('be.visible').type('anapmedeiros@gmail.com').should('have.value', 'anapmedeiros@gmail.com')
        cy.get('#product').select(1).should('have.value', 'blog')
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
        cy.get('#open-text-area').should('be.visible').type('Test')
        cy.contains('button', 'Enviar').click()

    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })


    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                })
        })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
    
    
                    })
            })

    
            
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json', {encoding: null}).as('examplefile')
        cy.get('input[type="file"')
            .selectFile('@examplefile')
            .then(input => {
              expect(input[0].files[0].name).to.equal('example.json')  
        })
            
    })            
            
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
           
            
    })            
                       
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        
    })    

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando comando invoke', function () {
       const longtext2 = Cypress._.repeat('0123456789', 20)

       cy.get('#open-text-area')
       .invoke('val', longtext2)
       .should('have.value', longtext2)
    })  
   
    it('faz uma requisição HTTP', function () {
     cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const {status,statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
     })  
    
     it('Desafio (encontre o gato) 🐈 .invoke', () => {
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', '🐈')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('#title')
            .invoke('text','CAT TAC') 
        cy.get('#subtitle')
            .invoke('text', 'I love Cats') 
        
      })

})

    
