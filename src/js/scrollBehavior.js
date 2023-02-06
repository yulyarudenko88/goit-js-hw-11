const onTopBtnRef = document.querySelector('.on-top');

window.addEventListener('scroll', onScroll);
onTopBtnRef.addEventListener('click', onTopBtn);

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  // return console.log(cardHeight);
}

function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  // console.log(scrolled, coords);
  if (scrolled > coords) {
    onTopBtnRef.classList.add('is-hidden');
  }
  if (scrolled < coords) {
    onTopBtnRef.classList.remove('is-hidden');
  }
}

function onTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export { smoothScroll, onTopBtn, onScroll };
