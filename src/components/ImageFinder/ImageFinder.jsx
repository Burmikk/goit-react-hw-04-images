import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import getImages from '../../shared/api/image-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from '../../shared/Loader/Loader';
import Button from '../../shared/Button/Button';
import Modal from 'shared/Modal/Modal';
import scss from './imageFinder.module.scss';

const ImageFinder = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getImages(search, page);
      setImages(prevState => [...prevState, ...data.hits]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error.message || 'Something wrong! Try later!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search) {
      fetch();
    } // eslint-disable-next-line
  }, [search, page]);

  const handelSubmitForm = value => {
    if (value === '') {
      return alert('Введите запрос');
    }
    setSearch(value);
    setImages([]);
    setPage(1);
  };

  const onShowModal = url => {
    setBigImg(url);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const loadMorePhoto = () => {
    setPage(prevState => prevState + 1);
  };
  const shown = page * 12;
  return (
    <div className={scss.container}>
      {showModal && (
        <Modal close={onClose}>
          <img src={bigImg} alt="" width="800" />
        </Modal>
      )}
      <SearchBar onSubmit={handelSubmitForm} />
      {error && <div>{error}</div>}
      <ImageGallery images={images} onShowModal={onShowModal} />
      {isLoading && <Loader />}
      {search !== '' && images.length === 0 && !isLoading && (
        <h2 className={scss.not_found}>Images not found 😞</h2>
      )}
      {images.length > 0 && shown < totalHits && (
        <Button loadMore={loadMorePhoto} />
      )}
    </div>
  );
};

export default ImageFinder;
