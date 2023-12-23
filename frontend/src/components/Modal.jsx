import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const portalElement = document.getElementById("modal");

const Modal = (props) => {
    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            props.closeModal();
        }
    };
    return (
        <>
            {ReactDom.createPortal(
                <div className={classes.backdrop} onClick={closeModal}>
                    <div className={classes.modal}>{props.children}</div>
                </div>,
                portalElement
            )}
        </>
    );
};

export default Modal;
