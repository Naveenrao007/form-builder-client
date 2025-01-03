import React, { useState } from "react";
import style from "./Sharemodel.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import {generateLink } from "../../../Service/Dashboard"
import CloseIcon from "../../../assets/icons/close.png";


function Sharemodel({ isOpen, onClose, onSave }) {
  const [isEdit, setIsEdit] = useState("view");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  

  const handleInvite = () => {
    if (!emailId || !/\S+@\S+\.\S+/.test(emailId)) {
      setError("Enter a valid email address.");
    } else {
      const shareData = {
        email: emailId,
        permission: isEdit,
      };
      onSave(shareData);
    }
  };

  const handleEmailInput = (e) => {
    setEmailId(e.target.value);
    setError(""); // Clear the error message on input change
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  const generateShareLink = async (permission) => {
    console.log(permission);
    
        const res =  await generateLink(permission) 
        console.log(res);
        
  };    
  
  return (
    isOpen && (
      <div className={`open-sans ${style.modalOverlay}`}>
        <div className={`flexdc ${style.modalContent}`}>
          <div className="flex jcfe">
            <img src={CloseIcon} alt="" className="cp" onClick={handleClose} />
          </div>
          <div className={style.shareContainer}>
            <div className="flex jcsb">
              <label className={`${style.ModalHeading} white`}>
                Invite by Email
              </label>
              <div className={style.dropdownContainer}>
                <select
                  onChange={(e) => setIsEdit(e.target.value)}
                  className={style.customSelect}
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>
              </div>
            </div>
            <div className="mrtop1rem">
              <input
                className={` ${style.inputCreateFolder}`}
                onChange={handleEmailInput}
                value={emailId}
                type="email"
                placeholder="Enter email id"
              />
              {error && <p className={style.errorText}>{error}</p>}
              <button
                className={`${style.primarybtn} mrtop2rem`}
                onClick={handleInvite}
              >
                Send Invite
              </button>
            </div>
            <div className="mrtop1rem">
              <p className={`${style.ModalHeading} white`}>Invite by link</p>
              <button
                className={`${style.primarybtn} mrtop1rem`}
                onClick={() => generateShareLink(isEdit)}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Sharemodel;
