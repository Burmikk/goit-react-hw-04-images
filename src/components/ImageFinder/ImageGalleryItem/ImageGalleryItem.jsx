import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tag,
  onShowModal,
}) => {
  return (
    <li className={styles.gallery_item}>
      <img
        className={styles.img}
        src={webformatURL}
        alt={tag}
        onClick={() => onShowModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
  onShowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
