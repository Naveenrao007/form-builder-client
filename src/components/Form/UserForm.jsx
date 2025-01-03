import React from 'react'
import style from "./UserForm.module.css"
import { useState } from 'react';
import text from "../../assets/icons/text.png"
import textInput from "../../assets/icons/textInput.png"
import emailInput from "../../assets/icons/emailInput.png"
import numberInput from "../../assets/icons/numberInput.png"
import phoneInput from "../../assets/icons/phoneinput.png"
import dateInput from "../../assets/icons/dateinput.png"
import ratingInput from "../../assets/icons/ratingsInput.png"
import buttonInput from "../../assets/icons/buttonInput.png"
import image from "../../assets/icons/image.png"
import video from "../../assets/icons/videos.png"
import gif from "../../assets/icons/gif.png"
import close from "../../assets/icons/close.png"
function UserForm() {
    const [darkmode, setDarkmode] = useState(true);

    const handleDarkmode = () => {
        setDarkmode((prev) => !prev);
    };
    return (
        <div className={` open-sans bg-black ${style.userFormMainContainer}`}>
            <div className={`${style.headerContainer}`}>
                <div className='white' >
                    <input type="text" className={style.inputFormIn} placeholder='Enter Form Name' />
                </div>
                <div className='white flex gap2rem alineItemCenter'>
                    <button className={style.flow}>Flow  </button>
                    <p> Response</p>
                </div>
                <div className='flex alineItemCenter'>
                    <div className="flex gap1rem ">
                        <p className='white'>Light</p>
                        <label className={`${style.switch}`}>
                            <input
                                type="checkbox"
                                checked={darkmode}
                                onChange={handleDarkmode}
                            />
                            <span className={`${style.slider} ${style.round}`}></span>
                        </label>
                        <p className='white'>Dark</p>
                    </div>
                    <div className='flex mrleft1rem alineItemCenter gap1rem'>
                        <button className={`${style.primarybtn} ${style.shareBtnColor}`}>share</button>
                        <button className={`${style.primarybtn} ${style.saveBtnColor}`}>save</button>
                        <img   className='flex  cp jcc alineItemCenter ' src={close} alt="" />
                    </div>
                </div>
            </div>
            <div className={style.userFormContainer} >
                <div className={style.userFormLeft}>
                    <div>
                        <h2 className='white font16px fw600'>Bubbles</h2>
                        <div className={style.bubbleContainer}>
                            <div >
                                <div className={style.bubble}>
                                    <img src={text} alt="text" />
                                    <p>Text</p>
                                </div>
                                <div className={style.bubble}>
                                    <img src={image} alt="image" />
                                    <p>Image</p>
                                </div>
                            </div>
                            <div>
                                <div className={style.bubble}>
                                    <img src={video} alt="video" />
                                    <p>Video</p>
                                </div>
                                <div className={style.bubble}>
                                    <img src={gif} alt="gif" />
                                    <p>GIF</p>
                                </div>
                            </div>
                        </div>
                        <h2 className='white font16px fw600'>Inputs</h2>
                        <div className={style.bubbleContainer}>
                            <div>
                                <div className={style.bubble}>
                                    <img src={textInput} alt="text" />
                                    <p>Text</p>
                                </div>
                                <div className={style.bubble}>
                                    <img src={numberInput} alt="image" />
                                    <p>Number</p>
                                </div>
                            </div>
                            <div>
                                <div className={style.bubble}>
                                    <img src={emailInput} alt="video" />
                                    <p>Email</p>
                                </div>
                                <div className={style.bubble}>
                                    <img src={phoneInput} alt="gif" />
                                    <p>Phone</p>
                                </div>
                            </div>
                            <div>
                                <div className={style.bubble}>
                                    <img src={dateInput} alt="video" />
                                    <p>Date</p>
                                </div>
                                <div className={style.bubble}>
                                    <img src={ratingInput} alt="gif" />
                                    <p>Rating</p>
                                </div>
                            </div>
                            <div>
                                <div className={style.bubble}>
                                    <img src={buttonInput} alt="video" />
                                    <p>Buttons</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className={style.userFormRight} ></div>
            </div>
        </div>
    )
}
export default UserForm