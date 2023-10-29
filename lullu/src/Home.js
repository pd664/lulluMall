import React, { useState, useEffect } from 'react'
import UserHome from './comps/win/home/UserHome'
import SignIn from './comps/authentication/SignIn'
import SignUp from './comps/authentication/SignUp'
import { Routes, Route } from 'react-router-dom';

import { getToken, setUserSession, removeUserSession } from "./utils/Common";
import axios from 'axios';
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute';

function Home() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return
    }

    else {
      return axios.get(`/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
    }
  }, [getToken]);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div>
        <Routes>
            <Route exact path="/signin" element={<PublicRoute component={SignIn} />}></Route>
            <Route exact path='/signup' element={<PublicRoute component={SignUp} />} />
            <Route exact path='/' element={<PrivateRoute component={UserHome} />}></Route>
        </Routes> 
    </div>
  )
}

export default Home