import ReactDOM from 'react-dom';
import React from 'react';
import styles from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            <div className={styles.content} onClick={props.onClick}>{props.children} </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
};

export default Modal;