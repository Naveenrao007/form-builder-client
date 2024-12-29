import React from "react";
import style from "./Header.module.css";
import dropdown from "../../assets/icons/Vector.png";
import Sharemodel from "../models/ShareModel/Sharemodel";
import { useState } from "react";
function Header() {
    const [darkmode, setDarkmode] = useState(true);
    const [ShareIsOpen, setShareIsOpen] = useState(false);
    const handleDarkmode = () => {
        setDarkmode((prev) => !prev);
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
                <div className={style.userDetailsContainer}>
                    <p> Dewank Rastogi's workspace </p>
                    <div>
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
                </div>
                <div className={`${style.rightDiv}`}>
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
                        <button className={style.HeaderBtn} onClick={() => setShareIsOpen(true)}>Share</button>
                    </div>
                </div>
            </div>
            <Sharemodel isOpen={ShareIsOpen} onClose={() => setShareIsOpen(false)} />
        </>
    );
}

export default Header;
