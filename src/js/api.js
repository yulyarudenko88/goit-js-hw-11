const ENDPOINT = 'https://pixabay.com/api/';
const USER_KEY = '33319957-e5644aada7d51fb110ddf6361';

export default class ImagesApi {
  constructor() {
    this.queryPage = 1;
    this.perPage = 40;
    this.searchQuery = '';
  }

  getImages() {
    const searchParams = new URLSearchParams({
      key: USER_KEY,
      q: `${this.searchQuery}`,
      image_type: 'phono',
      orientation: 'horizontal',
      safesearch: true,
      page: this.queryPage,
      per_page: 40,
    });

    return fetch(`${ENDPOINT}?${searchParams}`).then(response =>{
      if (!response.ok) {
        throw new Error(response.status);
      }      

      return response.json()
    }).then((data) => {
      this.incrementPage();
      // console.log(this.queryPage);
      return data;
    });
  }

  resetPage() {
    this.queryPage = 1;
  }

  incrementPage() {
    this.queryPage += 1;
  }
}
