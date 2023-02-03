import './css/styles.css';
import ImagesApi from './js/api';
import { makeImageCard } from './js/templates';
import { LoadMoreBtn } from './js/loadMoreBtn';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const imagesApi = new ImagesApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

ref.form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesApi.searchQuery = form.elements.searchQuery.value.trim();

  loadMoreBtn.show();
  imagesApi.resetPage();
  fetchImages().catch(error => console.log(error));
}

function fetchImages() {
  loadMoreBtn.disable();

  return imagesApi
    .getImages()
    .then(({ hits }) => {
      // console.log(hits);
      if (hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return hits;
    })
    .then(createMarkup)
    .then(addNewCards);
}

function createMarkup(cards) {
  loadMoreBtn.enable();

  const markup = cards.map(card => makeImageCard(card)).join('');
  return (ref.gallery.innerHTML = markup);
}

function addNewCards(markup) {
  return document
    .querySelector('.gallery')
    .insertAdjacentHTML('beforeend', markup);
}
