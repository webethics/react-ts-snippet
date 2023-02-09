import React, { type ReactElement } from "react";
import Button from "../formElements/Button";
import { type modalBottomConfig } from "../../types/includesTypes";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalBottom = (props: modalBottomConfig): ReactElement => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.isClose}
            className="modalBottomClass"
            overlayClassName="ModalOverlay"
            contentLabel="Add Project"
        >
            <div className="modal-header mb-7 flex items-center justify-center">
                <h3 className="text-18 leading-21 text-black font-inter-medium block text-center">
                    {props.title}
                </h3>
                <button
                    type="button"
                    className="absolute top-4.5 right-4 bg-transparent group"
                    onClick={props.isClose}
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 group-hover:fill-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="modal-content-wrap">{props.component}</div>
            <div className="modal-footer">
                {Boolean(props.buttonContent) && (
                    <Button
                        classes={`custom-button custom-button-large custom-button-fill-primary ${
                            // eslint-disable-next-line no-extra-boolean-cast
                            Boolean(props.isQuillButton) ? "quill-button" : ""
                        }`}
                        attributes={{
                            type: "button",
                            value: props.buttonContent,
                            clickEvent: () => {
                                props.attributes.clickEvent();
                            },
                            loader: props.attributes.loader,
                            disabled: props.attributes.disabled,
                        }}
                    />
                )}
            </div>
        </Modal>
    );
};

export default ModalBottom;
