import axios from 'axios';

const getImages = (search, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '33062942-48d2f969e86b1c2660c340e41',
      page: page,
      per_page: 12,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
};

export default getImages;
