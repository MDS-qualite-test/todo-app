describe('Marquage d\'une tâche comme terminée', () => {
  beforeEach(() => {
    // Visiter la page d'accueil de l'application
    cy.visit('http://localhost:3000');
  });

  it('devrait permettre de marquer une tâche comme terminée', () => {
    // Ajouter une nouvelle tâche d'abord
    cy.get('[title="Ajouter une nouvelle tâche"]').click();
    
    // Remplir le formulaire étape par étape
    cy.get('input[placeholder*="Tâche à réaliser"]').type('Tâche de test pour marquage');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('textarea[placeholder*="Description de la tâche"]').type('Description de test');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('input[placeholder*="Localisation de la tâche"]').type('Paris');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('input[placeholder*="Date & Heure"]').type('25/05/2025, 10:00');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    // Ajouter la tâche
    cy.get('button[title*="Ajouter"]').click();
    
    // Vérifier que la tâche est affichée
    cy.contains('Tâche de test pour marquage').should('be.visible');
    
    // Vérifier que la checkbox n'est pas cochée initialement
    cy.get('input[type="checkbox"]').should('not.be.checked');
    
    // Cocher la checkbox pour marquer la tâche comme terminée
    cy.get('input[type="checkbox"]').click();
    
    // Vérifier que la checkbox est maintenant cochée
    cy.get('input[type="checkbox"]').should('be.checked');
    
    // Vérifier que la tâche est toujours visible (car le filtre est "Toutes")
    cy.contains('Tâche de test pour marquage').should('be.visible');
  });

  it('devrait permettre de décocher une tâche terminée', () => {
    // Ajouter une nouvelle tâche
    cy.get('[title="Ajouter une nouvelle tâche"]').click();
    
    cy.get('input[placeholder*="Tâche à réaliser"]').type('Tâche pour test décocher');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('textarea[placeholder*="Description de la tâche"]').type('Description de test');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('input[placeholder*="Localisation de la tâche"]').type('Lyon');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('input[placeholder*="Date & Heure"]').type('26/05/2025, 14:00');
    cy.get('form').trigger('keydown', { key: 'Tab' });
    
    cy.get('button[title*="Ajouter"]').click();
    
    // Cocher la tâche
    cy.get('input[type="checkbox"]').click();
    cy.get('input[type="checkbox"]').should('be.checked');
    
    // Décocher la tâche
    cy.get('input[type="checkbox"]').click();
    cy.get('input[type="checkbox"]').should('not.be.checked');
  });
}); 