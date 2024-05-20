import { Product } from "../types/types";

export const createSlide = (
  product: Product,
  slides: HTMLElement,
  slideContent: HTMLElement
) => {
  const { thumbnail, title, description } = product;

  const img = document.createElement("img");
  img.src = thumbnail;
  img.alt = title;
  slides.appendChild(img);

  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = `
    <h1>${title}</h1>
    <p>${description}</p>
    ${createButton("More Info").outerHTML}
    ${createButton("Contact").outerHTML}
  `;
  slideContent.appendChild(contentDiv);
};

const createButton = (text: string): HTMLButtonElement => {
  const button = document.createElement("button");
  const className = text.toLowerCase().replace(/\s+/g, "-");
  button.textContent = text;
  button.classList.add(className);

  if (text === "More Info") {
    button.classList.add("button__more-info");
  }

  return button;
};
