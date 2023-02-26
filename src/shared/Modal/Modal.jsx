import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from '../Modal/modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.handleClose}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Modal;
