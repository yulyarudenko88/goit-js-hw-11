import './css/styles.css';
import ImagesApi from './js/api';
import { makeImageCard } from './js/templates';
import { LoadMoreBtn } from './js/loadMoreBtn';
import { smoothScroll, onTopBtn, onScroll } from './js/scrollBehavior';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const optionsSL = {
  overlayOpacity: 0.5,
  captionsData: 'alt',
  captionDelay: 250,
};
let simpleLightbox = new SimpleLightbox('.gallery a', optionsSL);

const imagesApi = new ImagesApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

ref.form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

onScroll();
onTopBtn();

async function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesApi.searchQuery = form.elements.searchQuery.value.trim();

  clearGalleryField();
  loadMoreBtn.show();
  imagesApi.resetPage();

  if (imagesApi.searchQuery === '') {
    clearGalleryField();
    loadMoreBtn.hide();
    Notify.info('You cannot search by empty field, try again.');
    return;
  }

  try {
    const { hits, totalHits } = await imagesApi.getImages();
    // console.log({ hits, totalHits });
    if (hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createMarkup(hits);
      simpleLightbox.refresh();
      
      Notify.success(`Hooray! We found ${totalHits} images.`);
      if (totalHits < imagesApi.perPage) {
        loadMoreBtn.hide();
      }
    }
  } catch (error) {
    console.error(error);
    Notify.failure('Sorry, pictures are not found!');
  }
}

async function onLoadMore(e) {
  e.preventDefault();

  loadMoreBtn.disable();

  const totalPages = imagesApi.queryPage * imagesApi.perPage;

  try {
    const { hits, totalHits } = await imagesApi.getImages();
    
    if (totalPages >= totalHits) {
      loadMoreBtn.hide();

        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
    } 
      createMarkup(hits);
      simpleLightbox.refresh();
      smoothScroll();
  } catch (error) {
    console.error(error);
    Notify.failure('Sorry, something went wrong!');
  }}

function createMarkup(cards) {
  loadMoreBtn.enable();

  const markup = cards.map(card => makeImageCard(card)).join('');
  return ref.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryField() {
  ref.gallery.innerHTML = '';
}
