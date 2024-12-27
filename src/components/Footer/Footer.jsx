import React from 'react'
import style from "./Footer.module.css"
import LinkSvg from "../../assets/icons/linkSvg.png"
function Footer() {
    return (
        <div className={style.Footer_bgColor}>
            <div className={` ${style.FooterContainer}`}>
                <div className='white'>
                    made with ❤️ by <br /> <span className='underline ' >@naveenRaw</span>
                </div>
                <div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp ' > Status</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Roadmap</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white  underline cp' > Status</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Pricing</p>
                    </div>
                </div>
                <div>

                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Discord</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > GitHub repository</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Twitter</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > LinkedIn</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > OSS Friends</p>
                    </div>
                </div>
                <div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > About</p>
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Contact</p>
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Terms of Service</p>
                    </div>
                    <div className={` ${style.footerLinks}`}>
                        <p className='white underline cp' > Privacy Policy</p>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Footer