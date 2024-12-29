import React, { useState } from 'react'
import style from "./SignUp.module.css"
import Stars from "../../assets/images/Stars.png"
import Ellipse1 from "../../assets/images/Ellipse1.png"
import Ellipse2 from "../../assets/images/Ellipse2.png"
import GoogleIcon from "../../assets/icons/GoogleIcon.png"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../../Service/User'
function SignUp() {
    const navigate = useNavigate()
    const [signUpdata, setSignUpdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignUpdata((prev) => ({ ...prev, [name]: value }))
    }
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!signUpdata.name) newErrors.name = "Name is required.";

        if (!signUpdata.email || !/\S+@\S+\.\S+/.test(signUpdata.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        const password = signUpdata.password;
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
        if (!signUpdata.confirmPassword || signUpdata.confirmPassword != signUpdata.password) {

            newErrors.confirmPassword = "Confirm password must be the same.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async () => {
        if (validate()) {
            const { confirmPassword, ...dataToSend } = signUpdata;
        
          const response = await register(dataToSend);
          console.log(response);
          // 
          if (response.status === 400) {
            toast.error(response.error.message, {
              autoClose: 1400,
    
            });
            setTimeout(() => {
              window.location.href = "/signin";
            }, 1900);
          } else if (response.status === 201) {
            toast.success(response.data.message, {
              autoClose: 2000,
    
            });
            setTimeout(() => {
              navigate("/signin");
            }, 2100);
          } else if (response.status === 500) {
            toast.error("Internal server error", {
    
              autoClose: 5000,
    
            });
          } else if (response.status === 404) {
            toast.error("Url is incorrect", {
              autoClose: 5000,
    
            });
          }
        }
      };
    return (
        <div className={`bg-black ${style.SignUpContainer}`}>
            <div className='flexdc jcsb w-full'>
                <div className='backtn'>
                    <svg className='bg-black cp '
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
                <div className='flex jcsb '>
                    <div className='flex jcsb  width60per '>
                        <div>
                            <img src={Stars} alt="Stars" />
                        </div>
                        <div className={style.SignUpinputfields}>
                            <div className='flexdc mrtophalfrem'>
                                <label className={errors.name ? "red" : "white"} htmlFor="Username">Username</label>
                                <input type="text" className={`mrtophalfrem ${style.inputSignIn} ${errors.name ? "errorBorder" : "Border"}`}
                                    onChange={handleChange} value={signUpdata.name} name='name' placeholder='Enter a username' />
                                {errors.name && <p className={`${style.errorText}`}>{errors.name}</p>}
                            </div>
                            <div className='flexdc mrtophalfrem'>

                                <label className={errors.email ? "red" : 'white'} htmlFor="email">Email</label>
                                <input type="text" className={`mrtophalfrem ${style.inputSignIn} ${errors.email ? "errorBorder" : "Border"}`} onChange={handleChange} value={signUpdata.email} name='email' placeholder='Enter your email' />
                                {errors.email && <p className={`${style.errorText}`}>{errors.email}</p>}
                            </div>
                            <div className='flexdc mrtophalfrem'>
                                <label className={errors.password ? "red" : 'white'} htmlFor="password">Password</label>
                                <input type="password" className={`mrtophalfrem ${style.inputSignIn} ${errors.password ? "errorBorder" : "Border"}`} onChange={handleChange} value={signUpdata.password} name='password' placeholder='********' />
                                {errors.password && (
                                    <p className={`${style.errorText}`}>{errors.password}</p>
                                )}
                            </div>
                            <div className='flexdc mrtophalfrem'>
                                <label className={errors.confirmPassword ? "red" : 'white'} htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" className={`mrtophalfrem ${style.inputSignIn} ${errors.confirmPassword ? "errorBorder" : "Border"}`} onChange={handleChange} value={signUpdata.confirmPassword} name='confirmPassword' placeholder='********' />
                                {errors.confirmPassword && (
                                    <p className={`${style.errorText}`}>{errors.confirmPassword}</p>
                                )}
                            </div>
                            <div className='mrtop1rem'>
                                <button className={`${style.primarybtn}`} onClick={handleSubmit} >Sign Up</button>
                                <p className='white texalignC  mrtop1rem '>OR</p>
                            </div>
                            <div>
                                <div className={`${style.primarybtn}  flex gap2rem alineItemCenter`}>
                                    <div className={`${style.GoogleIconDiv} `} >
                                        <img src={GoogleIcon} alt="" />
                                    </div>
                                    <p>Sign Up with Google</p>
                                </div>
                                <div className='mrtop2rem'>
                                    <p className='texalignC white'> Already have an account  ? <span className='blue cp font16px' onClick={() => navigate("/signin")} > Login</span></p>
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

export default SignUp