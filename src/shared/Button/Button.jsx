import PropTypes from 'prop-types';
import scss from './button.module.scss';

const Button = ({ loadMore }) => {
  return (
    <button className={scss.btn} onClick={loadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
export default Button;
