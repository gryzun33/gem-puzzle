export function showDigits(chips) {
  const digit = document.querySelector('.digit');
  digit.addEventListener('click', () => {
    chips.forEach((chip) => {
      if (getComputedStyle(chip).color === 'rgba(0, 0, 0, 0)') {
        chip.style.color = 'white';
        chip.style.textShadow = '1px 1px 5px black';
      } else {
        chip.style.color = 'transparent';
        chip.style.textShadow = '';
      }
    });
  });
}
