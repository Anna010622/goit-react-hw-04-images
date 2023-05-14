import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeClick);
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeClick);
    document.body.classList.remove('no-scroll');
  }

  handleEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <ModalOverlay onClick={this.onBackdropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}
