import React from 'react';
import style from "./LogoutModel.module.css";

function LogoutModel({ isOpen, onConfirm, onClose }) {
 
    
    return (
        isOpen && (
            <div className={`open-sans ${style.modalOverlay}`}>
                <div className={style.modalContent}>
                    <h2 className={`white ${style.ModalHeading}`}>
                        Are you sure you want to log out?
                    </h2>
                    <div className={`mrtop1rem ${style.buttonContainer}`}>
                        <button className="blue bg-black" onClick={onConfirm}>
                            Yes
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

export default LogoutModel;
