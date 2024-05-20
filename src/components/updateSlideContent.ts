export const updateSlideContent = (currentIndex: number) => {
  const slideContents = document.querySelectorAll<HTMLElement>(
    ".slider__slide-content div"
  );
  slideContents.forEach((content, contentIndex) => {
    content.style.display = contentIndex === currentIndex ? "block" : "none";
  });
};
