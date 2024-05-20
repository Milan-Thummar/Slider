import "./slider.scss";
import { createSlide } from "./components/createSlide";
import { fetchData } from "./components/fetchData";
import { updateSlideContent } from "./components/updateSlideContent";
import { Product } from "./types/types";

class Slider extends HTMLElement {
  private slides: HTMLElement;
  private slideContent: HTMLElement;
  private spinnerContainer: HTMLElement;
  private currentIndex: number;
  private intervalId?: ReturnType<typeof setInterval>;
  private isLoading: boolean;

  constructor() {
    super();
    this.innerHTML = `
      <div class="slider">
        <div class="slider__overlay"></div>
        <div class="slider__spinner-container">
          <div class="spinner"></div>
        </div>
        <div class="slider__slides"></div>
        <div class="slider__slide-content"></div>
      </div>
    `;

    this.currentIndex = 0;
    this.isLoading = true;
    this.spinnerContainer = this.querySelector(
      ".slider__spinner-container"
    ) as HTMLElement;
    this.slides = this.querySelector(".slider__slides") as HTMLElement;
    this.slideContent = this.querySelector(
      ".slider__slide-content"
    ) as HTMLElement;
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
          createSlide(product, this.slides, this.slideContent);
        });

        this.intervalId = setInterval(() => this.nextSlide(), 3000);
        updateSlideContent(this.currentIndex);
      }
    } catch (error) {
      console.error("Error initializing slider:", error);
      this.spinnerContainer.style.display = "none";
    }
  }

  private nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.children.length;
    this.goToSlide(this.currentIndex);
  }

  private prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.children.length) %
      this.slides.children.length;
    this.goToSlide(this.currentIndex);
  }

  private goToSlide(index: number): void {
    this.currentIndex = index;
    const offset = -100 * this.currentIndex;
    this.slides.style.transform = `translateX(${offset}%)`;
    updateSlideContent(this.currentIndex);
  }
}

customElements.define("slider-element", Slider);
