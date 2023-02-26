import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import getImages from '../../shared/api/image-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from '../../shared/Loader/Loader';
import Button from '../../shared/Button/Button';
import Modal from 'shared/Modal/Modal';
import scss from './imageFinder.module.scss';

class ImageFinder extends Component {
  state = {
    images: [],
    search: '',
    isLoading: false,
    page: 1,
    showModal: false,
    bigImg: '',
    error: null,
    totalHits: 0,
  };

  async fetch() {
    try {
      this.setState({ isLoading: true });
      const { search, page } = this.state;
      const { data } = await getImages(search, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message || 'Something wrong! Try later!' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      this.fetch();
    }
  }

  handelSubmitForm = value => {
    if (value === '') {
      return alert('Введите запрос');
    }
    this.setState({ search: value, images: [], page: 1 });
  };

  loadMorePhoto = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onShowModal = url => {
    this.setState({ bigImg: url, showModal: true });
  };
  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      bigImg,
      page,
      totalHits,
      error,
      search,
    } = this.state;
    const shown = page * 12;

    return (
      <div className={scss.container}>
        {showModal && (
          <Modal close={this.onClose}>
            <img src={bigImg} alt="" width="800" />
          </Modal>
        )}
        <SearchBar onSubmit={this.handelSubmitForm} />
        <div>{error}</div>

        <ImageGallery images={images} onShowModal={this.onShowModal} />
        {isLoading && <Loader />}
        {search !== '' && images.length === 0 && !isLoading && (
          <h2 className={scss.not_found}>Images not found 😞</h2>
        )}
        {images.length > 0 && shown < totalHits && (
          <Button loadMore={this.loadMorePhoto} />
        )}
      </div>
    );
  }
}

export default ImageFinder;
