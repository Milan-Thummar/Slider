/// <reference types="cypress" />

describe("Slider Component", () => {
  const slidesContent = [
    {
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
    },
    {
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    },
    {
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
    },
    {
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
    },
    {
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
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
