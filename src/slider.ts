import "./slider.scss";
import { fetchData } from "./components/fetchData";
import { Product } from "./types/types";

class Slider extends HTMLElement {
  private spinnerContainer: HTMLElement;
  private isLoading: boolean;

  constructor() {
    super();
    this.innerHTML = `
      <div class="slider">
        <div class="slider__spinner-container">
          <div class="spinner"></div>
        </div>
      </div>
    `;

    this.spinnerContainer = this.querySelector(
      ".slider__spinner-container"
    ) as HTMLElement;
    this.isLoading = true;
  }

  async connectedCallback() {
    await this.initializeSlider();
  }

  private async initializeSlider(): Promise<void> {
    try {
      const { data: products, loading } = await fetchData(
        "https://dummyjson.com/products",
        5
      );
      this.isLoading = loading;

      if (!this.isLoading) {
        this.spinnerContainer.style.display = "none";
        products.forEach((product: Product) => {
          return product;
        });
      }
    } catch (error) {
      console.error("Error initializing slider:", error);
      this.spinnerContainer.style.display = "none";
    }
  }
}

customElements.define("slider-element", Slider);
