/// <reference types="cypress" />

describe("Slider Component", () => {
  const slidesContent = [
    {
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    },
    {
      title: "Eyeshadow Palette with Mirror",
      description:
        "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    },
    {
      title: "Powder Canister",
      description:
        "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    },
    {
      title: "Red Lipstick",
      description:
        "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    },
    {
      title: "Red Nail Polish",
      description:
        "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    },
  ];

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the loading spinner initially", () => {
    cy.get(".slider__spinner-container").should("be.visible");
  });

  it("should display the slider with products after loading", () => {
    cy.get(".spinner-container").should("not.exist");
    cy.get(".slider").should("be.visible");
    cy.get(".slider__slides img").should("have.length", slidesContent.length);
  });

  it("should display the first product initially", () => {
    cy.get(".slider__slides img")
      .first()
      .should("have.css", "display", "block");
  });

  it("should change slides automatically every 3 seconds", () => {
    cy.wait(3000);
    cy.get(".slider__slides img").eq(1).should("have.css", "display", "block");
    cy.wait(3000);
    cy.get(".slider__slides img").eq(2).should("have.css", "display", "block");
  });

  it("should change slides when next button is clicked", () => {
    cy.get(".slider__button--next").click();
    cy.get(".slider__slides img").eq(1).should("have.css", "display", "block");
  });

  it("should change slides when prev button is clicked", () => {
    cy.get(".slider__button--prev").click();
    cy.get(".slider__slides img").last().should("have.css", "display", "block");
  });

  it("should show the correct slide content", () => {
    cy.get(".slider__slide-content").within(() => {
      cy.get("h1").should("contain", slidesContent[0].title);
      cy.get("p").should("contain", slidesContent[0].description);
    });
  });

  it("should change content on next button click", () => {
    slidesContent.forEach((slide, index) => {
      if (index > 0) {
        cy.get(".slider__button--next").click();
      }
      cy.get(".slider__slide-content").within(() => {
        cy.get("h1").should("contain", slide.title);
        cy.get("p").should("contain", slide.description);
      });
    });
  });

  it("should change content on prev button click", () => {
    for (let i = 1; i < slidesContent.length; i++) {
      cy.get(".slider__button--next").click();
    }
    slidesContent
      .slice()
      .reverse()
      .forEach((slide, index) => {
        if (index > 0) {
          cy.get(".slider__button--prev").click();
        }
        cy.get(".slider__slide-content").within(() => {
          cy.get("h1").should("contain", slide.title);
          cy.get("p").should("contain", slide.description);
        });
      });
  });
});
