import React, { useState } from 'react'
import '../../../static/win/gamePeriod/uniScroll.css'
import $ from 'jquery'
import Parity from '../result/parity/Parity'
import Bcone from '../result/bcone/Bcone'
import Emerd from '../result/emerd/Emerd'
import Spare from '../result/spare/Spare'
import Period from './Period';
import { useDispatch } from 'react-redux'
import { gameName } from '../../../reduxComps/action'
 
function Uniscroll() {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
      gameName: 'parity',
      mobie: '8076752907',
      userName: `pd664${Date.now()}`,
      userId: 12345,
      amount: 100,
      color: 'green',
      number: ''
  })
  dispatch(gameName('parity'))
  const selectGame = (name) => {
    dispatch(gameName(name))
  }

  $(document).ready(function () {
    $('#menu button').click(function () {
      var hrefId = $(this).attr('href');
      $('.div_screen_contents_frame .page').hide();
      $('.div_screen_contents_frame').find(hrefId).show();
      $('.home_btn').removeClass('activeNew').addClass('inactive');
      $(this).removeClass('inactive').addClass('activeNew');
    });
  });

  return (
    <div className='uniScroll'>
        <div className='uni-scroll' id='menu'>
            <div className='uni-scroll-btn d-flex justify-content-between text-center align-items-center'>
                {/* <ul className='uni-scroll-ul d-flex justify-content-between text-center align-items-center'> */}
                    <button className='home_btn inactive all_btn activeNew' href='#p1' onClick={() => selectGame('parity')}>Parity</button>
                    <button className='home_btn inactive' href="#p2" onClick={() => selectGame('spare')}>Sapre</button>
                    <button className='home_btn inactive' href="#p3" onClick={() => selectGame('bcone')}>Bcone</button>
                    <button className='home_btn inactive' href="#p4" onClick={() => selectGame('emerd')}>Emerd</button>
                {/* </ul> */}
            </div>
        </div>
        <div>
        <Period />
        </div>
        
        <div className='div_screen'>
        <div className="div_screen_contents_frame">
          <div className="page active" id="p1">
            <section className="icon fa fa-bolt">
              <Parity />
            </section>
          </div>
          <div className="page" id="p2">
            <section className="icon fa fa-bolt">
              <Spare />
            </section>
          </div>
          <div className="page" id="p3">
            <section className="icon fa fa-bolt">
              <Bcone />
            </section>
          </div>
          <div className="page" id="p4">
            <section className="icon fa fa-bolt">
              <Emerd />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uniscroll