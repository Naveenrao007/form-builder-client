import React from 'react'
import style from "./LandingPage.module.css"
import Logo from "../../assets/images/logo.png"
import Container from "../../assets/images/mainImage.png"
import LandingPageImg2 from "../../assets/images/LandingPageImg2.png"
import Section1 from "../../assets/images/Section1.png"
import Section2 from "../../assets/images/Section2.png"
import Section3 from "../../assets/images/Section3.png"
import Section4 from "../../assets/images/Section4.png"
import Section5 from "../../assets/images/Section5.png"
import Section6 from "../../assets/images/Section6.png"
import Section7 from "../../assets/images/Section7.png"
import Footer from '../Footer/Footer'
// import { useNavigate } from 'react-router-dom'
function LandingPage() {
    // const navigate = useNavigate()
    return (
        <div className={style.LandingPageContainer}  >
            <div className={`flex jcsb alineItemCenter ${style.headerPadding}`}>
                <div className='flex alineItemCenter '>
                    <img className={style.Logo} src={Logo} alt="" />
                    <p className={`white ${style.formBot}`}>FormBot</p>
                </div>
                <div>
                    <button className={`cp  fw700 ${style.primarybtn} ${style.SignIn}`}>SingIn</button>
                    <button className={`cp white  fw700 ${style.primarybtn} ${style.bg_green}`}>Create a FromBot</button>
                </div>
            </div>
            <div >
                <img className={style.ContainerImg} src={Container} alt="LandingPageImg1" />
            </div>
            <div >
                <img className={style.ContainerImg} src={LandingPageImg2} alt="LandingPageImg2" />
            </div>
            <div >
                <img className={style.ContainerImg} src={Section1} alt="Section1" />
            </div>
            <div >
                <img className={style.ContainerImg} src={Section2} alt="Section2" />
            </div>
            <div >
                <img className={style.ContainerImg} src={Section3} alt="Section3" />
            </div>
            <div >
                <img className={style.ContainerImg} src={Section4} alt="Section4" />
            </div>
            <div >
                <img className={style.ContainerImg} src={Section5} alt="Section5" />
            </div>
            <div className='mrtop1rem' >
                <img className={style.ContainerImg} src={Section6} alt="Section6" />
            </div>
            <div>
                <img className={style.ContainerImg} src={Section7} alt="Section7" />
            </div>
            <div >
                <Footer />
            </div>

        </div>
    )
}

export default LandingPage