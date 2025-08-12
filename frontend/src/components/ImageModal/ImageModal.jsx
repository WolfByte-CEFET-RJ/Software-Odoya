import React from 'react';
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import './ImageModal.scss';

const ImageModal = ({ src, alt = 'Imagem', isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} className="modal-image" />
        <button className="close-button" onClick={onClose}>
          <MdClose style={{backgroundColor: "#004d82", color: "white", borderRadius: "10px"}} size={48} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
