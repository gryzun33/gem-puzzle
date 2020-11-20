export function showDigits(chips) {
  const digit = document.querySelector('.digit');
  digit.addEventListener('click', () => {
    chips.forEach((chip) => {
      if (
        getComputedStyle(chip).fontSize === '0px' &&
        window.innerWidth > 500
      ) {
        chip.style.fontSize = '30px';
      } else if (
        getComputedStyle(chip).fontSize === '0px' &&
        window.innerWidth <= 500
      ) {
        chip.style.fontSize = '20px';
      } else {
        chip.style.fontSize = '0px';
      }
    });
  });
}
