export function createBg(
  bgSize,
  widthBgCell,
  count,
  widthCell,
  imgNumberInRow,
  imgNumberOfRow,
  bgPosition,
) {
  const container = document.querySelector('.container');
  bgSize = getComputedStyle(container).width;
  widthBgCell = (widthCell / 100) * parseInt(bgSize, 10);
  for (let i = 0; i < count; i += 1) {
    imgNumberInRow = i % Math.sqrt(count);
    imgNumberOfRow = Math.floor(i / Math.sqrt(count));
    bgPosition[i] = `-${imgNumberInRow * widthBgCell}px -${
      imgNumberOfRow * widthBgCell
    }px`;
  }
}
