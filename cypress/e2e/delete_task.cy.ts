describe('Gestion des tâches', () => {
  it('Devrait supprimer une tâche avec succès', () => {
    cy.visit('/')
    cy.get('button[title="Ajouter une nouvelle tâche"]').click()
    const taskText = 'Tâche à supprimer'
    
    cy.get('form[data-testid="todo-form"]').within(() => {
      cy.get('input[name="nom"]').should('be.visible').type(taskText)
      cy.get('.dot').eq(1).click()
      cy.wait(500)

      cy.get('.dot').eq(2).click()
      cy.wait(500)
      cy.get('textarea').should('be.visible').type('Description de test')
      cy.get('.dot').eq(2).click()
      cy.wait(500)

      cy.get('.dot').eq(3).click()
      cy.wait(500)
      cy.get('input[name="localisation"]').should('be.visible').type('Paris')
      cy.get('.dot').eq(3).click()
      cy.wait(500)

      cy.get('.dot').eq(4).click()
      cy.wait(500)
      cy.get('input[name="dateHeure"]').should('be.visible').type('01/01/2024, 12:00')
      cy.get('.dot').eq(4).click()
      cy.wait(500)

      cy.get('.dot').eq(5).click()
      cy.wait(500)

      cy.get('button[title="Ajouter la tâche à la liste ?"]').click()
    })

    cy.contains(taskText).should('exist')

    cy.contains(taskText)
      .parent()
      .parent()
      .find('button.btn__danger')
      .click()

    cy.on('window:confirm', () => true)

    cy.contains(taskText).should('not.exist')
  })
})