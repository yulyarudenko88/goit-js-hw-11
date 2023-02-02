import './css/styles.css';
import ImagesApi from './js/api';

const ref = {
  form: document.getElementById('search-form'),
};

ref.form.addEventListener('submit', onSearch);

const imagesApi = new ImagesApi();

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesApi.searchQuery = form.elements.searchQuery.value.trim();

  fetchImages();
}

function fetchImages() {
  return imagesApi.getImages().then(image => console.log(image));
}
