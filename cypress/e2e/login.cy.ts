describe("Home Page", () => {
  it("prevents access to protected pages without login", () => {
    cy.visit("/blog");

    cy.url().should("include", "/login");
    cy.contains("Login").should("exist");
  });

  // it("Login in successfully", () => {
  //   const username = "amtulla@gmail.com";
  //   const password = "amtulla";
  //   cy.login(username, password);
  // });
});
