import Notiflix from 'notiflix';
import {
  serviceImages,
  createMarkup,
  hideButton,
  showButton,
  showTotalResults,
  scrollToSection,
} from './functions.js';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  wrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', handleSearch);

hideButton();

let currentPage = 0;
let pageLimit = 0;
let inputValue = '';

function handleSearch(event) {
  event.preventDefault();
  serviceImages(refs.input.value, (page = 1))
    .then(({ data }) => {
      console.log(data);
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Oooops.... There are no images matching your search query. Please try again.',
          {
            position: 'center-center',
            width: '700px',
            fontSize: '30px',
            borderRadius: '10px',
          }
        );

        hideButton();
      } else if (!refs.input.value.trim()) {
        Notiflix.Notify.failure(
          'Ooops... You must enter any tag in the field',
          {
            position: 'center-center',
            width: '700px',
            fontSize: '30px',
            borderRadius: '10px',
          }
        );
      } else if (data.totalHits <= 40) {
        refs.wrapper.innerHTML = createMarkup(data.hits);
        showTotalResults(data.totalHits);
        hideButton();
        return;
      } else {
        pageLimit = Math.ceil(data.totalHits / 40);
        refs.wrapper.innerHTML = createMarkup(data.hits);
        showButton();
        currentPage = 2;
        showTotalResults(data.totalHits);
        inputValue = refs.input.value;
        scrollToSection(refs.wrapper);
      }
    })
    .catch(console.log)
    .finally(() => {
      refs.form.reset();
    });
}

refs.loadMoreBtn.addEventListener('click', () => {
  hideButton();
  serviceImages(inputValue, currentPage)
    .then(({ data }) => {
      console.log(currentPage);
      if (pageLimit === currentPage) {
        hideButton();
        refs.wrapper.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        return;
      }
      showButton();
      refs.wrapper.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      currentPage++;
    })
    .catch(console.log);
});
