describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
it("Should cancel interview", () => {
  cy.get("[alt=Delete]").first().click({ force: true });

  cy.contains("Confirm").click();

  cy.contains("Deleting");
  cy.contains("Deleting").should("not.exist");
  cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
});
