export function aboveBtn() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
    
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  // return console.log(cardHeight);
}