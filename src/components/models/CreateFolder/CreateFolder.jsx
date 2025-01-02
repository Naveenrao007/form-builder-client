import React, { useState } from 'react';
import style from "./CreateFolder.module.css";

function CreateFolder({ isOpen, onSave, onClose, type }) {
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFolderName(e.target.value);
        setError("");
    };

    const handleSave = () => {
        if (!folderName.trim()) {
            setError(`${type === 'folder' ? "Folder" : "File"} name cannot be empty.`);
            return;
        }
        setError("");
        onSave(folderName.trim());
        setFolderName("");
    };

    const handleClose = () => {
        setError("");
        setFolderName("");
        onClose();
    };

    return (
        isOpen && (
            <div className={`open-sans ${style.modalOverlay}`}>
                <div className={style.modalContent}>
                    <h2 className={`white ${style.ModalHeading}`}>
                        Create New {type === 'folder' ? 'Folder' : 'File'}
                    </h2>
                    <div className="mrtop1rem">
                        <input
                            type="text"
                            className={style.inputCreateFolder}
                            name="foldername"
                            value={folderName}
                            onChange={handleChange}
                            placeholder={`Enter ${type === 'folder' ? 'folder' : 'file'} name`}
                        />
                        {error && <p className={style.errorText}>{error}</p>}
                    </div>
                    <div className={`mrtop1rem ${style.buttonContainer}`}>
                        <button className="blue bg-black" onClick={handleSave}>
                            Done
                        </button>
                        <span></span>
                        <button className="white bg-black" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default CreateFolder;
