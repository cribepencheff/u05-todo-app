const loader = document.createElement('div');
loader.classList.add('spinner');

export const addSpinnerSmall = (el: HTMLElement): void => {
  el.appendChild(loader);
  // el.append(`<p>Laddar</p>`);
}

export const removeSpinnerSmall = (el: HTMLElement): void => {
  el.removeChild(loader);
}


