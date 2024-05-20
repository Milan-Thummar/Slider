const setTimeLineStyles = (
  timeLineFill: HTMLElement,
  transitionDuration: string,
  width: string
) => {
  timeLineFill.style.transitionDuration = transitionDuration;
  timeLineFill.style.width = width;
};

export const updateTimeLines = (currentIndex: number) => {
  const timeLines = document.querySelectorAll<HTMLElement>(".slider__timeline");
  timeLines.forEach((timeLine, index) => {
    const timeLineFill = timeLine.children[0] as HTMLElement;
    if (index === currentIndex) {
      setTimeLineStyles(timeLineFill, "0s", "0");
      setTimeout(() => {
        setTimeLineStyles(timeLineFill, "3s", "100%");
      }, 100);
    } else {
      setTimeLineStyles(timeLineFill, "0s", "0");
    }
  });
};
