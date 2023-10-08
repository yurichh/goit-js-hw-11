import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  wrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', handleSearch);
refs.loadMoreBtn.hidden = true;
let page = 2;

function handleSearch(event) {
  event.preventDefault();
  serviceImages(refs.input.value)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Oooooooooooops.... There are no images matching your search query. Please try again.'
        );
        refs.loadMoreBtn.hidden = true;
      } else {
        refs.wrapper.innerHTML = createMarkup(data.hits);
        refs.loadMoreBtn.hidden = false;
      }
    })
    .catch(console.log);
  // .finally(() => {
  //   refs.form.reset();
  // });
}
refs.loadMoreBtn.addEventListener('click', () => {
  serviceImages(refs.input.value, page++).then(({ data }) => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Oooooooooooops.... There are no images more'
      ).catch(console.log);
    }
    refs.wrapper.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  });
});

function serviceImages(value, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '39910711-abcee3e7f1b375d2c0a92cc23';
  return axios.get(
    `${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
}

function createMarkup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card-image"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
