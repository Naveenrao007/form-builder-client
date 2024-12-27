import React from 'react'
import style from "./SignIn.module.css"
import Stars from "../../assets/images/Stars.png"
import Ellipse1 from "../../assets/images/Ellipse1.png"
import Ellipse2 from "../../assets/images/Ellipse2.png"
import GoogleIcon from "../../assets/icons/GoogleIcon.png"
import { useNavigate } from 'react-router-dom'
function SignIn() {
  const navigate = useNavigate()
  return (
    <div className={`bg-black ${style.SignUpContainer}`}>
      <div className='flexdc jcsb w-full'>
      <div className='backtn'>
          <svg className='bg-black cp'
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px" }}
            onClick={()=> window.history.back()}
          >
            <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="white" />
          </svg>
        </div>
        <div className='flex jcsb'>
          <div className='flex jcsb  width60per '>
            <div>
              <img src={Stars} alt="Stars" />
            </div>
            <div className={style.SignInInputfields}>
              <div className='flexdc'>
                <label className='white' htmlFor="email">Email</label>
                <input type="text" className={` mrtophalfrem ${style.inputSignIn}`} name='email' placeholder='Enter your email' />
              </div>
              <div className='flexdc mrtophalfrem'>
                <label className='white' htmlFor="password">Password</label>
                <input type="text" className={` mrtophalfrem   ${style.inputSignIn}`} name='password' placeholder='********' />
              </div>
              <div className='mrtop1rem'>
                <button className={`${style.primarybtn}`} onClick={() => navigate("/signin")}>Log In</button>
                <p className='white texalignC  mrtop1rem '>OR</p>
              </div>
              <div>
                <div className={`${style.primarybtn}  flex gap2rem alineItemCenter`}>
                  <div className={`${style.GoogleIconDiv} `} >
                    <img src={GoogleIcon} alt="" />
                  </div>
                  <p>Sign In with Google</p>
                </div>
                <div className='mrtop2rem'>
                  <p className='texalignC white'> Don’t have an account? <span onClick={() => navigate("/signup")}>Register now</span></p>

                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={Ellipse2} alt="Ellipse2" />

          </div>
        </div>
        <div className={`${style.SignUpLastImg}`}>
          <img src={Ellipse1} alt="Ellipse1" />
        </div>
      </div>
    </div>
  )
}

export default SignIn