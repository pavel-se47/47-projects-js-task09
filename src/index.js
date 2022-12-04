const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const closeLightboxEl = document.querySelector(
  '[data-action="close-lightbox"]'
);
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

galleryItems.forEach(galleryItem => {
  const addLi = document.createElement('li');
  addLi.classList.add('gallery__item');

  const addAtoLi = document.createElement('a');
  addAtoLi.classList.add('gallery__link');
  addAtoLi.setAttribute('href', `${galleryItem.original}`);

  const addImg = document.createElement('img');
  addImg.classList.add('gallery__image');
  addImg.setAttribute('src', `${galleryItem.preview}`);
  addImg.setAttribute('data-source', `${galleryItem.original}`);
  addImg.setAttribute('alt', `${galleryItem.description}`);

  addLi.append(addAtoLi, addImg);
  galleryEl.append(addLi);
});

const onClickGetLink = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  return event.target.dataset.source;
};

const onClickOpenModal = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightboxEl.classList.add('is-open');
  lightboxEl.children[1].firstElementChild.alt = event.target.alt;
  lightboxEl.children[1].firstElementChild.src = event.target.dataset.source;
  window.addEventListener('keydown', onEscKeyPressCloseModal);
  window.addEventListener('keydown', onScrollGalleryByArrow);
};

const onClickCloseModal = () => {
  lightboxEl.classList.remove('is-open');
  lightboxEl.children[1].firstElementChild.alt = '';
  lightboxEl.children[1].firstElementChild.src = '';
  window.removeEventListener('keydown', onEscKeyPressCloseModal);
  window.removeEventListener('keydown', onScrollGalleryByArrow);
};

const onClickBackdrop = event => {
  if (event.currentTarget === event.target) {
    onClickCloseModal();
  }
};

const onEscKeyPressCloseModal = event => {
  if (event.code === 'Escape') {
    onClickCloseModal();
  }
};

const onScrollGalleryByArrow = event => {
  let currentDesc = lightboxEl.children[1].firstElementChild.alt;

  if (event.code === 'ArrowRight') {
    for (let i = 0; i < galleryItems.length - 1; i += 1) {
      if (currentDesc !== galleryItems[i].description) {
        continue;
      }
      lightboxEl.children[1].firstElementChild.alt =
        galleryItems[i + 1].description;
      lightboxEl.children[1].firstElementChild.src =
        galleryItems[i + 1].original;
    }
  } else if (event.code === 'ArrowLeft') {
    for (let i = 1; i < galleryItems.length; i += 1) {
      if (currentDesc !== galleryItems[i].description) {
        continue;
      }
      lightboxEl.children[1].firstElementChild.alt =
        galleryItems[i - 1].description;
      lightboxEl.children[1].firstElementChild.src =
        galleryItems[i - 1].original;
    }
  }
};

galleryEl.addEventListener('click', onClickGetLink);
galleryEl.addEventListener('click', onClickOpenModal);
closeLightboxEl.addEventListener('click', onClickCloseModal);
lightboxOverlayEl.addEventListener('click', onClickBackdrop);
