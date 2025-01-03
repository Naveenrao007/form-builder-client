import React, { useState } from "react";
import style from "./Settings.module.css";
import userImg from "../../assets/icons/user.png";
import emailImg from "../../assets/icons/email.png"
import LogoutImg from "../../assets/icons/Logout.png"
import openEyeImg from "../../assets/icons/openEye.png";
import closedEyeImg from "../../assets/icons/closedEye.png";
import passwordImg from "../../assets/icons/password.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../Service/User"
import { useContext } from "react";
import { MyContext } from "../../context/Context";
import LogoutModel from "../models/LogoutModel/LogoutModel";
function Settings() {
  const { contextdata, setContextData } = useContext(MyContext);
  const [LogoutIsopen, setLogoutIsopen] = useState(false)

  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState({
    oldPassword: { type: "password", sourceImg: closedEyeImg },
    newPassword: { type: "password", sourceImg: closedEyeImg },
  });


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    common: "",
  });
  const [errors, setErrors] = useState({});

  const handleTogglePassword = (fieldName) => {
    setVisiblePass((prevState) => ({
      ...prevState,
      [fieldName]: {
        type: prevState[fieldName].type === "password" ? "text" : "password",
        sourceImg:
          prevState[fieldName].sourceImg === closedEyeImg
            ? openEyeImg
            : closedEyeImg,
      },
    }));
  };
  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const validate = () => {
    const errors = {};

    let count = 0;
    if (formData.name) count++;
    if (formData.email) count++;
    if (formData.oldPassword) count++;
    if (count > 1) {
      errors.common = "You can update one thing at a time.";
    } else if (!formData.name && !formData.email && !formData.oldPassword) {
      errors.common = "Atleast one filed required.";
    }

    if (!/^[A-Za-z]/.test(formData.name) && formData.name) {
      errors.name = "Name must be start with a letter.";
    }

    if (count === 1 && formData.oldPassword && !formData.newPassword) {
      errors.newPassword = "Enter new Password";
    }
    if (
      count === 1 &&
      formData.oldPassword &&
      formData.newPassword &&
      formData.oldPassword === formData.newPassword
    ) {
      errors.newPassword =
        "New password must be different from the old password.";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setErrors({});
      const response = await updateUser(formData);
      console.log("naveen", response);

      if (response.status === 404) {
        toast.error(response.error.message, {
          autoClose: 1400,
        });
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1900);
      } else if (response.status === 400) {
        toast.error(response.error.message, {
          autoClose: 1400,
        });
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1900);
      } else if (response.status === 201) {
        toast.success(response.data.message, {
          autoClose: 1400,
        });

      } else if (response.status === 401) {
        toast.error(response.error.message, {
          autoClose: 1400,
        });
      } else if (response.status === 500) {
        toast.error("Internal server error", {
          autoClose: 1400,
        });
      }

    } else {
      setErrors(errors);
    }
  };
  const onConfirm = () => {
    localStorage.removeItem("token")
    toast("You have successfully logged out.", { autoClose: 1200 })
    navigate("/signin")
  }
  return (
    <div className={style.container}>

      <div className={`open-sans ${style.rightSide}`}>
        <h1 className={` ${style.m_auto} ${style.regheading} `}>Setttings</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <img src={userImg} alt="user png" />
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Name"
            />
          </div>
          {errors.name && <p className={style.errorMsg}>{errors.name}</p>}
          <div className={style.inputContainer}>
            <img src={emailImg} alt="email png" />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder=" Updated Email"
            />
          </div>

          {errors.email && <p className={style.errorMsg}>{errors.email}</p>}
          <div className={style.inputContainer}>
            <img src={passwordImg} alt="password png" />
            <input
              type={visiblePass.oldPassword.type}
              name="oldPassword"
              onChange={handleInputChange}
              value={formData.oldPassword}
              placeholder=" Old Password"
            />
            <img
              className="cp"
              src={visiblePass.oldPassword.sourceImg}
              alt=" toggle eye png"
              onClick={() => handleTogglePassword("oldPassword")}
            />
          </div>

          {errors.oldPassword && (
            <p className={style.errorMsg}>{errors.oldPassword}</p>
          )}

          <div className={style.inputContainer}>
            <img src={passwordImg} alt="new password png" />
            <input
              type={visiblePass.newPassword.type}
              placeholder="New Password"
              onChange={handleInputChange}
              name="newPassword"
              value={formData.newPassword}
            />
            <img
              className="cp"
              src={visiblePass.newPassword.sourceImg}
              alt="toggle eye svg"
              onClick={() => handleTogglePassword("newPassword")}
            />
          </div>

          {errors.newPassword && (
            <p className={style.errorMsg}>{errors.newPassword}</p>
          )}
          {errors.common && <p className={style.errorMsg}>{errors.common}</p>}
          <button
            className={`primary-btn  mrtop2rem cp ${style.btnCss} ${style.regbtn}`}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
      <div className={` white ${style.LogoutDiv}`} onClick={() => { setLogoutIsopen(true) }}>
        <img src={LogoutImg} alt="LogoutImg" />
        <p>Logout</p>
      </div>
      <LogoutModel
        isOpen={LogoutIsopen}
        onClose={() => setLogoutIsopen(false)}
        onConfirm={onConfirm}
      />
    </div>

  );
}

export default Settings;