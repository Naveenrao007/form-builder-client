import React from 'react'
import style from "./Footer.module.css"
import LinkSvg from "../../assets/icons/linkSvg.png"
function Footer() {
    return (
        <div  className={style.Footer_bgColor}>
            <div className={` ${style.FooterContainer}`}>
                <div className='white'>
                    made with ❤️ by <br /> <span className='underline' >@naveenRaw</span>
                </div>
                <div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline mrtophalfrem' > Status</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Roadmap</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Status</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Pricing</p>
                    </div>
                </div>
                <div>

                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Discord</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > GitHub repository</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Twitter</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > LinkedIn</p>
                        <img src={LinkSvg} alt="" />
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > OSS Friends</p>
                    </div>
                </div>
                <div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > About</p>
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Contact</p>
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Terms of Service</p>
                    </div>
                    <div className='flex gaphalfrem mrtop1rem'>
                        <p className='white underline' > Privacy Policy</p>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Footer