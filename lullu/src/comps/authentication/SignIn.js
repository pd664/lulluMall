import React, { useState } from "react";
// import '../../static/authentication/signin.css'
import '../../static/authentication/signin.css'
import axios from "axios";
import { setUserSession } from "../../utils/Common";
import { useNavigate } from "react-router-dom";
import {socket} from '../../socket'

function SignIn(props) {
  const [mobileBumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const clickHandler = async () => {
    setLoading(true);
    // console.log("user", mobileBumber, password)
    await axios
      .post("/users/signin", {
        mobileNumber: mobileBumber,
        password: password,
      })
      .then(async (response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        await socket.connect();
        let data = {name: 'prateek', userId: 'pd664'};
        socket.emit('setSocketId', data);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log("error is, ",error)
        setError(error.message);
      });
  };

  return (
    <div id="signin" className="bg-gray">
      <div className="signincontainer">
        <div className="signinbody ">
          <div className="heading bg-primary text-white pri_heading">
            <p className="pri_heading_cont px-3" onClick={() => navigate('/signup')}> Login</p>
          </div>
          <div className="signIn_form text-center">
            {/* <form> */}

              <div className='form_input_container'>
                  <div className='form_input_container_cont'>
                      <input className="input w-100 mt-5 cu-form-group mobile_num" type="number" name="mobileNumber" placeholder="&#128241; Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
                  </div>
              </div>

              <div className='form_input_container'>
                  <div className='form_input_container_cont'>
                      <input className="input w-100 mt-5 cu-form-group" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
              </div>

              {/* <input className="input" type="text" name="mobileBumber" placeholder="Enter your mobileBumber" onChange={(e) => setMobileNumber(e.target.value)} /> */}
              {/* <br /> */}
              
              <div className='submit'>
                <div className="signin_register_btn">
                <input className="input sign_in btn_cred btn-primary" name="signin" type="button" value={loading ? "Loading..." : "Login"} onClick={clickHandler} disabled={loading} />
                </div>
              </div>
              
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}

              <div className="sign_in_btns d-flex align-items-center justify-content-around w-100 py-5">
                <div className="register_link sign_in_link_cont">
                  <a className="register sign_in_link" onClick={() => navigate('/signup')}>Register</a>
                </div>
                <div className="forgot_btn sign_in_link_cont">
                  <a className="forgot sign_in_link">Forgot Password?</a>
                </div>
              </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

