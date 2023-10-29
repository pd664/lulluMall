import React, { useEffect, useState } from 'react';
import '../../static/authentication/signup.css'
import axios from 'axios';
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const [mobileNumber, setMobieNumber] = useState();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        setUserId(dateString + randomness);
          
    })

    const clickHandler = () => {
        setLoading(true);
        axios.post('/users/signup', {
            mobileNumber: mobileNumber,
            password: hashIt(password),
            id: userId
        })
        .then((res) => {
            setLoading(false);
            alert(res.data.message)
            navigate('/signin')
        })
        .catch((err) => {
            setLoading(false);
            setError(err.response.data.message);
        })
    }

    const hashIt = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const handleSignup = () => {
        navigate('/signin')
    }
    return(
        <div id="signup" className="bg-gray">
            <div className="signupcontainer">
                <div className="">
                    <div className="bg-primary text-white register pri_heading" onClick={() => navigate('/signin')}>
                        <p className='register_cont pri_heading_cont px-3'> Register</p>
                    </div>
                    <div className="signup_form cred_form">
                        {/* <form className="signup_form_cont"> */}
                        <div className='signup_input_container form_input_container'>
                            <div className='signup_input_container_cont form_input_container_cont'>
                                <input className="input w-100 mt-5 cu-form-group mobile_num" type="number" name="username" placeholder="&#128241; Mobile Number" onChange={(e) => setMobieNumber(e.target.value)} required />
                            </div>
                        </div>

                        <div className='signup_input_container form_input_container'>
                            <div className='signup_input_container_cont form_input_container_cont'>
                                <input className="input w-100 mt-5 cu-form-group input_blue_clr" type="number" name="username" placeholder="Verification Code" onChange={(e) => setMobieNumber(e.target.value)} required />
                            </div>
                        </div>

                        <div className='signup_input_container form_input_container'>
                            <div className='signup_input_container_cont form_input_container_cont'>
                            <input className="input w-100 mt-5 cu-form-group input_blue_clr" type="password" name="password" placeholder=" &#128477; Password" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                        </div>

                        <div className='signup_input_container form_input_container'>
                            <div className='signup_input_container_cont form_input_container_cont'>
                            <input className="input w-100 mt-5 cu-form-group" type="number" name="username" placeholder="Recommedation Code" text={userId} required></input>
                            </div>
                        </div>
                            
                        <div className='policies px-3'>
                            <div className='agree'>
                                <p className=''>&#x2705; I agree <span className='text-primary'> PRIVACY POLICY</span></p>
                            </div>
                            <div className='privacy'>
                                <p></p>
                            </div>
                        </div>    
                    
                        <div className='submit'>

                            <div className="register_btn">
                                <input className="input w-100 mt-2 mb-5 btn_cred btn-primary" type="button" value={loading ? 'Loading...' : 'Register'} onClick={clickHandler} disabled={loading} />
                            </div>
                        </div>
                            
                            {/* <input className="input w-100 mt-5 btn_cred sign_up" type="button" name="submit" value={loading ? 'Loading...' : 'SIGN UP'} onClick={clickHandler} disabled={loading} />
                            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                            <small><span id="or"></span> OR</small><br />
                            <small><span id="acc" >Have an account? </span></small>
                            <br />
                            <input className="input w-100 mt-2 mb-5 btn_cred" type="button" value={loading ? 'Loading...' : 'SIGN IN'} onClick={handleSignup} disabled={loading} /> */}
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
