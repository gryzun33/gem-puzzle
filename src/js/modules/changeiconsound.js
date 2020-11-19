export function changeIconSound() {
  const iconSound = document.querySelector('.icon-sound');
  iconSound.addEventListener('click', () => {
    if (iconSound.innerHTML === '<i class="material-icons">volume_off</i>') {
      iconSound.innerHTML = '<i class="material-icons">volume_up</i>';
    } else {
      iconSound.innerHTML = '<i class="material-icons">volume_off</i>';
    }
  });
}
