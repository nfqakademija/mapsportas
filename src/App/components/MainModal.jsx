import React from 'react';
import Modal from 'react-modal';

const MainModal = ({ content, isOpen, handleCloseModal }) => (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            className="modalContent"
            overlayClassName="overlay"
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
        >
            <div className="row">
                <div className="col-12" onClick={handleCloseModal}>
                    <img className="close"  src='/images/closeButton.svg'></img>
                </div>
                <div className="col-12">
                    {content}
                </div>
            </div>
        </Modal>
);

export default MainModal;