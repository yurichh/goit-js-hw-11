import Notiflix from 'notiflix';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  wrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

function serviceImages(value, page) {
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
      <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0b6100" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #d0ccc4;" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.192" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #cfcac2;"></g><g id="SVGRepo_iconCarrier"> <path d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97998C3 3.33998 4.34 2.01001 6 2.01001H18C19.66 2.01001 21 3.33998 21 4.97998V15.89C21 17.52 19.66 18.86 18 18.86Z" stroke="#359038" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #74d477;"></path> <path d="M12.28 14.96C12.13 15.01 11.88 15.01 11.72 14.96C10.42 14.51 7.5 12.66 7.5 9.51001C7.5 8.12001 8.62 7 10 7C10.82 7 11.54 7.39 12 8C12.46 7.39 13.18 7 14 7C15.38 7 16.5 8.12001 16.5 9.51001C16.49 12.66 13.58 14.51 12.28 14.96Z" stroke="#359038" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #74d477;"></path> </g></svg>${likes}
    </p>
    <p class="info-item">
      <svg width="40px" height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#359038" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z" style="--darkreader-inline-fill: #217225;" data-darkreader-inline-fill=""></path></g></svg>${views}
    </p>
    <p class="info-item">
      <svg width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment-3</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: none;"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -255.000000)" fill="#359038" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #217225;"> <path d="M228,267 C226.896,267 226,267.896 226,269 C226,270.104 226.896,271 228,271 C229.104,271 230,270.104 230,269 C230,267.896 229.104,267 228,267 L228,267 Z M220,281 C218.832,281 217.704,280.864 216.62,280.633 L211.912,283.463 L211.975,278.824 C208.366,276.654 206,273.066 206,269 C206,262.373 212.268,257 220,257 C227.732,257 234,262.373 234,269 C234,275.628 227.732,281 220,281 L220,281 Z M220,255 C211.164,255 204,261.269 204,269 C204,273.419 206.345,277.354 210,279.919 L210,287 L217.009,282.747 C217.979,282.907 218.977,283 220,283 C228.836,283 236,276.732 236,269 C236,261.269 228.836,255 220,255 L220,255 Z M212,267 C210.896,267 210,267.896 210,269 C210,270.104 210.896,271 212,271 C213.104,271 214,270.104 214,269 C214,267.896 213.104,267 212,267 L212,267 Z M220,267 C218.896,267 218,267.896 218,269 C218,270.104 218.896,271 220,271 C221.104,271 222,270.104 222,269 C222,267.896 221.104,267 220,267 L220,267 Z" id="comment-3" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>${comments}
    </p>
    <p class="info-item">
      <svg viewBox="0 0 512 512" width="40px" height="40px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>download</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: none;"> <g id="icon" fill="#359038" transform="translate(85.333333, 42.666667)" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #217225;"> <path d="M312.32,165.76 L285.013333,132.906667 L192,210.56 L192,7.10542736e-15 L149.333333,7.10542736e-15 L149.333333,210.56 L56.32,132.906667 L29.0133333,165.76 L170.666667,283.733333 L312.32,165.76 L312.32,165.76 Z M1.42108547e-14,341.333333 L341.333333,341.333333 L341.333333,384 L1.42108547e-14,384 L1.42108547e-14,341.333333 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
function hideButton() {
  refs.loadMoreBtn.hidden = true;
}
function showButton() {
  refs.loadMoreBtn.hidden = false;
}
function showTotalResults(value) {
  Notiflix.Notify.info(`Hooray! We found ${value} images`, {
    position: 'center-top',
    width: '700px',
    fontSize: '30px',
    borderRadius: '10px',
    clickToClose: true,
  });
}
function scrollToSection(target) {
  if (target) {
    const offset = target.getBoundingClientRect().top + window.scrollY - 30;

    window.scroll({
      top: offset,
      behavior: 'smooth',
    });
  }
}
export {
  serviceImages,
  createMarkup,
  hideButton,
  showButton,
  showTotalResults,
  scrollToSection,
};
