describe("Task Filtering", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("http://localhost:3000");

    // Add some test tasks
    cy.get('[data-testid="todo-form"]').within(() => {
      // Add a completed task
      cy.get('button[title="Ajouter une nouvelle tâche"]').click();

      // Step 1: Enter task name
      cy.get('input[name="nom"]').should("be.visible").type("Completed Task");
      cy.get('input[name="nom"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 2: Enter description
      cy.get('textarea[name="description"]')
        .should("be.visible")
        .type("This is a completed task");
      cy.get('textarea[name="description"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 3: Enter location
      cy.get('input[name="localisation"]').should("be.visible").type("Paris");
      cy.get('input[name="localisation"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 4: Enter date/time
      cy.get('input[name="dateHeure"]')
        .should("be.visible")
        .type("01/01/2024, 12:00");
      cy.get('input[name="dateHeure"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 5: Confirm and add task
      cy.get('button[title="Ajouter la tâche à la liste ?"]')
        .should("be.visible")
        .click();
    });

    // Wait for the task to be added and mark it as completed
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo")
      .first()
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Add an incomplete task
    cy.get('[data-testid="todo-form"]').within(() => {
      cy.get('button[title="Ajouter une nouvelle tâche"]').click();

      // Step 1: Enter task name
      cy.get('input[name="nom"]').should("be.visible").type("Incomplete Task");
      cy.get('input[name="nom"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 2: Enter description
      cy.get('textarea[name="description"]')
        .should("be.visible")
        .type("This is an incomplete task");
      cy.get('textarea[name="description"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 3: Enter location
      cy.get('input[name="localisation"]').should("be.visible").type("London");
      cy.get('input[name="localisation"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 4: Enter date/time
      cy.get('input[name="dateHeure"]')
        .should("be.visible")
        .type("02/01/2024, 12:00");
      cy.get('input[name="dateHeure"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 5: Confirm and add task
      cy.get('button[title="Ajouter la tâche à la liste ?"]')
        .should("be.visible")
        .click();
    });

    // Wait for both tasks to be added
    cy.get(".todo").should("have.length", 2);
  });

  it("should filter tasks correctly", () => {
    // Check initial state - should show all tasks
    cy.get(".todo").should("have.length", 2);

    // Test "Active" filter
    cy.get(".btn.toggle-btn").contains("En cours").click();
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").first().should("contain", "Incomplete Task");

    // Test "Completed" filter
    cy.get(".btn.toggle-btn").contains("Realisées").click();
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").first().should("contain", "Completed Task");

    // Test "All" filter
    cy.get(".btn.toggle-btn").contains("Toutes").click();
    cy.get(".todo").should("have.length", 2);
  });

  it("should maintain filter state when adding new tasks", () => {
    // Set filter to "Active"
    cy.get(".btn.toggle-btn").contains("En cours").click();
    cy.get(".todo").should("have.length", 1);

    // Add a new task
    cy.get('[data-testid="todo-form"]').within(() => {
      cy.get('button[title="Ajouter une nouvelle tâche"]').click();

      // Step 1: Enter task name
      cy.get('input[name="nom"]').should("be.visible").type("New Active Task");
      cy.get('input[name="nom"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 2: Enter description
      cy.get('textarea[name="description"]')
        .should("be.visible")
        .type("This is a new active task");
      cy.get('textarea[name="description"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 3: Enter location
      cy.get('input[name="localisation"]').should("be.visible").type("Berlin");
      cy.get('input[name="localisation"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 4: Enter date/time
      cy.get('input[name="dateHeure"]')
        .should("be.visible")
        .type("03/01/2024, 12:00");
      cy.get('input[name="dateHeure"]').trigger("keydown", { key: "Tab" }); // Move to next step

      // Step 5: Confirm and add task
      cy.get('button[title="Ajouter la tâche à la liste ?"]')
        .should("be.visible")
        .click();
    });

    // Wait for the new task to be added
    cy.get(".todo").should("have.length", 2);
    cy.get(".todo").should("not.contain", "Completed Task");
  });

  it("should update filter when completing a task", () => {
    // Set filter to "Active"
    cy.get(".btn.toggle-btn").contains("En cours").click();
    cy.get(".todo").should("have.length", 1);

    // Complete the active task
    cy.get(".todo")
      .first()
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Should now show no tasks in active filter
    cy.get(".todo").should("have.length", 0);

    // Switch to completed filter
    cy.get(".btn.toggle-btn").contains("Realisées").click();
    cy.get(".todo").should("have.length", 2);
  });
});
