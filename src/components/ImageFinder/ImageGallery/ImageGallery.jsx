import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ images, onShowModal }) => {
  const imagesLit = images.map(image => (
    <ImageGalleryItem key={image.id} {...image} onShowModal={onShowModal} />
  ));

  return <ul className={styles.gallery}>{imagesLit}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onShowModal: PropTypes.func.isRequired,
};
export default ImageGallery;
