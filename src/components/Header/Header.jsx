import React from "react";
import style from "./Header.module.css";
import dropdown from "../../assets/icons/Vector.png";
import Sharemodel from "../models/ShareModel/Sharemodel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../context/Context";
import LogoutModel from "../models/LogoutModel/LogoutModel";
import { shareDirectory } from "../../Service/Dashboard";
import { toast } from "react-toastify";

function Header({changeUser}) {
  const [darkmode, setDarkmode] = useState(true);
  const [ShareIsOpen, setShareIsOpen] = useState(false);
  const [dropdownIsOpen, setdropdownIsOpen] = useState(false);
  const [userDirName, setUserDirName] = useState("")
  const [LogoutIsopen, setLogoutIsopen] = useState(false);
  const { contextdata, setContextData } = useContext(MyContext);
  const userName = userDirName || contextdata?.user?.name;


  const handleDir = (item) => {
    setUserDirName(item.name)
    setdropdownIsOpen(false)
    changeUser(item)
  }

  const navigate = useNavigate();
  const handleDarkmode = () => {
    setDarkmode((prev) => !prev);
  };
  const handleShowDropdonw = () => {
    setdropdownIsOpen((prev) => !prev);
  };
  const onConfirm = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    toast("You have successfully logged out.", { autoClose: 1200 })
  };
  const onSave = async (data) => {
    try {
      const response = await shareDirectory(data);





      if (response.status === 404) {

        toast.error(response.error || "Resource not found", { autoClose: 1400 });
      } else if (response.status === 400) {
        toast.error(response.error || "Bad request", { autoClose: 1400 });




        if (["Invalid Token", "User not logged In"].includes(response.error)) {


          navigate("/signin");
        }
      } else if (response.status === 200) {

        toast.success(response.data.data.message || "Action successful", { autoClose: 1200 });
        setShareIsOpen(false)
      }
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error(error.response.data.error || "Server error occurred", { autoClose: 1400 });

    }
  };

  return (
    <>
      <div
        className={`${style.HeaderContainer}`}
        style={{
          backgroundColor: darkmode ? "black" : "white",
          color: darkmode ? "white" : "black",
        }}
      >
        <div className="hidden">dummy</div>
        <div className={`${style.userContainer}`}>
          <div className="width40per">
            <div
              className={`cp ${style.userDetailsContainer} ${dropdownIsOpen ? "dropdownBg" : "black"
                }`}
              onClick={handleShowDropdonw}
            >
              <p> {userName}'s workspace </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </div>
            <div className="width40per">
              {dropdownIsOpen && (
                <div className={style.dropdownContainer}>
                  <div>{
                    contextdata?.sharedUser?.map((item) => (<div key={item.id} className="useroptins white  cp" onClick={() => handleDir(item)}>{item.name}</div>
                    ))

                  }
                  </div>
                  <div>
                    <div
                      className={`white cp  useroptins ${style.setting}`}
                      onClick={() => navigate("/setting")}
                    >
                      Settings
                    </div>
                    <div
                      className={`white cp useroptins ${style.logout}`}
                      onClick={() => setLogoutIsopen(true)}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap1rem">
            <p>Light</p>
            <label className={`${style.switch}`}>
              <input
                type="checkbox"
                checked={darkmode}
                onChange={handleDarkmode}
              />
              <span className={`${style.slider} ${style.round}`}></span>
            </label>
            <p>Dark</p>
          </div>
          <div>
            <button
              className={style.HeaderBtn}
              onClick={() => setShareIsOpen(true)}
            >
              Share
            </button>
          </div>
        </div>
      </div>
      <Sharemodel isOpen={ShareIsOpen} onClose={() => setShareIsOpen(false)} onSave={onSave} />
      <LogoutModel
        isOpen={LogoutIsopen}
        onClose={() => setLogoutIsopen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default Header;
