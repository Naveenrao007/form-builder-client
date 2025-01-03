import React from 'react'
import style from "./SignIn.module.css"
import Stars from "../../assets/images/Stars.png"
import Ellipse1 from "../../assets/images/Ellipse1.png"
import Ellipse2 from "../../assets/images/Ellipse2.png"
import GoogleIcon from "../../assets/icons/GoogleIcon.png"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../Service/User'
import { toast } from 'react-toastify'
function SignIn() {
  const navigate = useNavigate()
  const [signIndata, setSignIndata] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setSignIndata((prev) => ({ ...prev, [name]: value }))
  }
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};


    if (!signIndata.email || !/\S+@\S+\.\S+/.test(signIndata.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    const password = signIndata.password;
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must include at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      newErrors.password = "Password must include at least one digit.";
    } else if (!/[@$!%*?&#]/.test(password)) {
      newErrors.password =
        "Password must include at least one special character (e.g., @, $, !, %, *, ?, &, #).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const response = await login(signIndata);
      if (response.status === 400) {
        if(response.error.message === "User not found"){
          toast.error(response.error.message, {
            autoClose: 1400,
          });
          navigate("/signup")
        }else{
          toast.error(response.error.message, {
            autoClose: 1400,
          });  
        }
        

      } else if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);

        toast.success(response.data.message, { autoClose: 1200 });
        navigate("/home");
      } else if (response.status === 500) {

        toast.error("Internal server error");
      } else if (response.status === 404) {
        toast.error("Url is incorrect");
      }

    }
  };
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
            onClick={() => window.history.back()}
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
                <label className={errors.email ? "red" : "white"} htmlFor="email">Email</label>
                <input type="text"
                  className={` mrtophalfrem ${style.inputSignIn} ${errors.email ? "errorBorder" : "Border"}`}
                  name='email' placeholder='Enter your email'
                  value={signIndata.email}
                  onChange={handleChange}
                />
                {errors.email && <p className={`${style.errorText}`}>{errors.email}</p>}
              </div>
              <div className='flexdc mrtophalfrem'>
                <label className={errors.password ? "red" : "white"} htmlFor="password">Password</label>
                <input type="text" className={` mrtophalfrem   ${style.inputSignIn} ${errors.password ? "errorBorder" : "Border"}`} name='password' placeholder='********'
                  value={signIndata.password}
                  onChange={handleChange}
                />
                {errors.password && <p className={`${style.errorText}`}>{errors.password}</p>}
              </div>
              <div className='mrtop1rem'>
                <button className={`${style.primarybtn}`} onClick={handleSubmit} >Log In</button>
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
                  <p className='texalignC white'> Don’t have an account ? <span className='blue cp font16px' onClick={() => navigate("/signup")}>Register now</span></p>

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