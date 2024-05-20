import { fetchData } from "./components/fetchData";

class Slider extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="slider">
      </div>
    `;
  }

  connectedCallback() {
    let isLoading = true;

    const initializeSlider = async (): Promise<void> => {
      try {
        const { data: products, loading } = await fetchData(
          "https://dummyjson.com/products",
          5
        );
        isLoading = loading;
        if (!isLoading) {
          products.forEach((product) => {
            return product;
          });
        }
      } catch (error) {
        console.error("Error initializing slider:", error);
        isLoading = false;
      }
    };

    initializeSlider();
  }
}

customElements.define("slider-element", Slider);
