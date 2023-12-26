describe("Home Page", () => {
  it("prevents access to protected pages without login", () => {
    cy.visit("/create");

    cy.url().should("include", "/login");
    cy.contains("Sign up").should("exist");
  });

  it("Login in successfully", () => {
    const username = "amtulla@gmail.com";
    const password = "amtulla";
    cy.login(username, password);

    cy.contains("Create blog").click();

    cy.get("[data-titleId=title]").type("Test Blog");

    cy.get(".ck-content[contenteditable=true]").then((el) => {
      // @ts-ignore
      const editor = el[0].ckeditorInstance;
      editor.setData("Typing some stuff");
    });
    cy.get(".ck-content").invoke("text").should("eql", "Typing some stuff");
    cy.get("[type=submit]").click();

    cy.get("[data-id=menu]").click().get("[type=submit]").click();
  });
});
