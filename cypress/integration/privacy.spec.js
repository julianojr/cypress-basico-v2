describe('Central de Atendimento ao Cliente TAT - 3 visitas', function(){
    Cypress._.times(3, function(){
        it('testa a página da política de privacidade de forma independente', function(){
            cy.visit('./src/privacy.html')
                .title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
            cy.contains('Talking About Testing').should('be.visible')
        })
    })
})

