/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Navroski')
        cy.get('#email').type('juliano@teste.com.br')
        cy.get('#open-text-area').type('Primeiro teste', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Navroski')
        cy.get('#email').type('emailerrado')
        cy.get('#open-text-area').type('Primeiro teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo de telefone não permite caracteres não-numéricos', function(){
        cy.get('#phone').type('abcdefg')
        cy.get('div').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Navroski')
        cy.get('#email').type('email@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Primeiro teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Juliano')
            .should('have.value', 'Juliano')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Navroski')
            .should('have.value', 'Navroski')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('juliano@teste.com.br')
            .should('have.value', 'juliano@teste.com.br')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('44999887766')
            .should('have.value', '44999887766')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit('Juliano', 'Navroski', 'juliano@teste.com.br', 'Teste comando customizado')
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu texto', function(){
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu texto', function(){
        cy.get('#product')
            .select('Blog')
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target')
            .click()
            .title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

})
