describe("Ajout d'une tâche", () => {
  it("devrait permettre d'ajouter une nouvelle tâche complète", () => {
    cy.visit('http://localhost:3000');

    // 1. Cliquer sur le bouton ➕ pour afficher le champ de saisie du nom
    cy.get('button[title="Ajouter une nouvelle tâche"]').click();

    // 2. Saisir le nom de la tâche
    cy.get('input[name="nom"]').type('Ma nouvelle tâche');

    // 3. Passer à l'étape suivante (description)
    cy.get('span.dot').eq(2).click();
    cy.get('textarea[name="description"]').type('Ceci est une description de test.');

    // 4. Passer à l'étape suivante (localisation)
    cy.get('span.dot').eq(3).click();
    cy.get('input[name="localisation"]').type('Paris');

    // 5. Passer à l'étape suivante (date/heure)
    cy.get('span.dot').eq(4).click();
    cy.get('input[name="dateHeure"]').type('01/01/2025, 12:00');

    // 6. Passer à l'étape de validation (le dernier dot)
    cy.get('span.dot').eq(5).click();

    // 7. Cliquer sur le bouton pour ajouter la tâche à la liste
    cy.get('button[title="Ajouter la tâche à la liste ?"]').click();

    // 8. Vérifier que la tâche apparaît dans la liste
    cy.contains('Ma nouvelle tâche').should('exist');
    cy.contains('Ceci est une description de test.').should('exist');
    cy.contains('Paris').should('exist');
    cy.contains('01/01/2025, 12:00').should('exist');
  });
}); 