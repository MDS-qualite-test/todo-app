// cypress/tests/counter.spec.js
describe("Counter Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display counter with initial value", () => {
    cy.contains("Count: 0");
  });

  it("should increment when increment button is clicked", () => {
    cy.contains("button", "Increment").click();
    cy.contains("Count: 1");
  });

  it("should decrement when decrement button is clicked", () => {
    cy.contains("button", "Increment").click();
    cy.contains("button", "Increment").click();
    cy.contains("Count: 2");
    cy.contains("button", "Decrement").click();
    cy.contains("Count: 1");
  });

  it("should reset to initial count when reset button is clicked", () => {
    cy.contains("button", "Increment").click();
    cy.contains("button", "Increment").click();
    cy.contains("Count: 2");
    cy.contains("button", "Reset").click();
    cy.contains("Count: 0");
  });
});
