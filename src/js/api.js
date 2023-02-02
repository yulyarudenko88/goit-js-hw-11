const ENDPOINT = 'https://pixabay.com/api/';
const USER_KEY = '33319957-e5644aada7d51fb110ddf6361';

export default class ImagesApi {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
  }

  getImages() {
    const parameters = `${USER_KEY}&q=${this.searchQuery}&image_type="phono"&orientation="horizontal"&safesearch="true"`;
    const url = `${ENDPOINT}?${parameters}`

    return fetch(url).then(response => response.json())
  }
}
