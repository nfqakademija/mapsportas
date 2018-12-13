import React from 'react';
import Modal from 'react-modal';

const MainModal = ({ content, isOpen, handleCloseModal }) => (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            style={{
                overlay: {
                    zIndex: '1000',
                },
                content: {
                    paddingTop: '3rem',
                }

            }}
        >
            <div className="close" onClick={handleCloseModal}>
                <a href="#">
                    <span className="left">
                        <span className="circle-left"></span>
                        <span className="circle-right"></span>
                    </span>
                    <span className="right">
                        <span className="circle-left"></span>
                        <span className="circle-right"></span>
                    </span>
                </a>
            </div>
                {content}
        </Modal>
);

export default MainModal;