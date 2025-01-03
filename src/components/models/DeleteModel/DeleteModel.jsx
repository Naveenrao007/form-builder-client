import React from 'react';
import style from "./DeleteModel.module.css";

function DeleteModel({ isOpen, onConfirm, onClose, type, id }) {
    const handleConfirm = () => {
        onConfirm(id);
    };

    return (
        isOpen && (
            <div className={`open-sans ${style.modalOverlay}`}>
                <div className={style.modalContent}>
                    <h2 className={`white ${style.ModalHeading}`}>
                        Are you sure you want to delete this {type.trim() === 'folder' ? 'folder' : 'file'}?
                    </h2>
                    <div className={`mrtop1rem ${style.buttonContainer}`}>
                        <button className="blue bg-black" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <span></span>
                        <button className="white bg-black" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteModel;
