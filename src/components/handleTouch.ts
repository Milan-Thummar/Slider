export const handleTouch = (
  slides: HTMLElement,
  handleSwipe: (deltaX: number) => void
) => {
  let touchStartX: number = 0;
  let touchEndX: number = 0;

  slides.addEventListener(
    "touchstart",
    (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    false
  );

  slides.addEventListener(
    "touchend",
    (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].clientX;
      handleSwipe(touchEndX - touchStartX);
    },
    false
  );
};
