let lineWidth: number;

export const createTimeLines = (
  slides: HTMLElement,
  timeLinesContainer: HTMLElement
) => {
  const slidesCount = slides.children.length;
  calculateLineWidth(slidesCount);
  updateLineWidth();

  window.addEventListener("resize", () => {
    calculateLineWidth(slidesCount);
    updateLineWidth();
  });

  for (let i = 0; i < slidesCount; i++) {
    createTimeLine(timeLinesContainer);
  }
  updateLineWidth();
};

const calculateLineWidth = (slidesCount: number) => {
  lineWidth = 100 / slidesCount;
  if (window.innerWidth >= 480 && lineWidth > 20) {
    lineWidth = 18;
  }
};

const updateLineWidth = () => {
  const timeLines = document.querySelectorAll<HTMLElement>(".slider__timeline");
  timeLines.forEach((timeLine) => {
    timeLine.style.width = `${lineWidth}%`;
  });
};

const createTimeLine = (timeLinesContainer: HTMLElement) => {
  const timeLine = document.createElement("div");
  timeLine.classList.add("slider__timeline");
  const timeLineFill = document.createElement("div");
  timeLineFill.classList.add("slider__timeline-fill");

  timeLine.appendChild(timeLineFill);
  timeLinesContainer.appendChild(timeLine);
};
