describe("App", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      orders: [
        {
          id: 1,
          name: "Pat",
          ingredients: [
            "beans",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
        {
          id: 2,
          name: "Sam",
          ingredients: [
            "steak",
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
      ],
    }).as("orders");

    cy.visit("http://localhost:3000");
  });

  it("should be able to retrieve data", () => {
    cy.wait("@orders").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it("should render header on load", () => {
    cy.get("h1").should("contain", "Burrito Builder");
  });

  it("should render burrito form", () => {
    cy.get("form").should("contain", "Submit Order");
    cy.get("form").should("contain", "lettuce");
    cy.get("form").should("contain", "Nothing selected");
    cy.get("button").should("have.length", 25);
  });

  it("should render previous orders", () => {
    cy.get(".previous-orders").should("contain", "Pat");
    cy.get(".previous-orders").should("contain", "Sam");
  });

  it("should not be able to place an order if NAME isn't present", () => {
    cy.wait("@orders");
    cy.get(".order").should("have.length", 2);
    cy.get(".error").should("contain", "");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submit").click();
    cy.get(".error").should("contain", "Looks like you are missing a name");
    cy.get(".order").should("have.length", 2);
  });

  it("should not be able to place an order if INGREDIENT isn't present", () => {
    cy.wait("@orders");
    cy.get(".order").should("have.length", 2);
    cy.get(".error").should("contain", "");
    cy.get('input[type="text"]').type("Josh");
    cy.get(".submit").click();
    cy.get(".error").should(
      "contain",
      "Looks like you are missing a ingredient"
    );
    cy.get(".order").should("have.length", 2);
  });


  it.only("should be able to place an order", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders").as("order");
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("Josh");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submit").click();
    cy.wait("@order").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.name).to.eq("Josh");
      expect(response.body.ingredients).to.deep.eq(["beans"]);
    });
  });
});
