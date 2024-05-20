import "./slider.scss";
import { createSlide } from "./components/createSlide";
import { fetchData } from "./components/fetchData";
import { updateSlideContent } from "./components/updateSlideContent";
import { createTimeLines } from "./components/createTimeLines";
import { updateTimeLines } from "./components/updateTimeLines";
import { Product } from "./types/types";

class Slider extends HTMLElement {
  private slides: HTMLElement;
  private slideContent: HTMLElement;
  private spinnerContainer: HTMLElement;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;
  private timeLinesContainer: HTMLElement;
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
         <div class="slider__controls">
          <div class="slider__timelines"></div>
          <div class="slider__buttons">
            <button class="slider__button--prev">&#10094;</button>
            <button class="slider__button--next">&#10095;</button>
          </div>
        </div>
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
    this.prevBtn = this.querySelector(
      ".slider__button--prev"
    ) as HTMLButtonElement;
    this.nextBtn = this.querySelector(
      ".slider__button--next"
    ) as HTMLButtonElement;
    this.timeLinesContainer = this.querySelector(
      ".slider__timelines"
    ) as HTMLElement;
  }

  async connectedCallback() {
    await this.initializeSlider();

    this.prevBtn.addEventListener("click", () => this.handleBtnClick("prev"));
    this.nextBtn.addEventListener("click", () => this.handleBtnClick("next"));
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

        createTimeLines(this.slides, this.timeLinesContainer);
        this.intervalId = setInterval(() => this.nextSlide(), 3000);
        updateTimeLines(this.currentIndex);
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
    updateTimeLines(this.currentIndex);
  }

  private handleBtnClick(direction: string): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    direction === "next" ? this.nextSlide() : this.prevSlide();
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }
}

customElements.define("slider-element", Slider);
