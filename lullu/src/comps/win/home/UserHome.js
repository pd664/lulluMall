import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import GamePeriod from '../gamePeriod/GamePeriod'
import { useSelector,useDispatch } from 'react-redux';
import AddAmountPopup from '../gamePeriod/AddAmountPopup'
import axios from 'axios';
import { parityPrevData, saprePrevData, emerdPrevData, bconePrevData } from '../../../reduxComps/action/getPrevData';

function UserHome() {
  const [openPopup, setOpenPopup] = useState(false)
  const popup = useSelector((state) => state.popUpState)
  const dispatch = useDispatch()

  
  useEffect(() => {
    return () => setOpenPopup(popup)
  }, [popup])

  useEffect( () => {
    async function getData() {
      await axios.post('/getParityResult')
    .then(async (res) => {
      console.log('parity result is', res)
      await dispatch(parityPrevData(res.data))
    })
    .catch(err => console.log(err))

    await axios.post('/getSapreResult')
    .then(async (res) => {
      console.log('sapre result is', res)
      await dispatch(saprePrevData(res.data))
    })
    .catch(err => console.log(err))

    await axios.post('/getEmerdResult')
    .then(async (res) => {
      console.log('emerd result is', res)
      await dispatch(emerdPrevData(res.data))
    })
    .catch(err => console.log(err))

    await axios.post('/getBconeResult')
    .then(async (res) => {
      console.log('bcone result is', res)
      await dispatch(bconePrevData(res.data))
    })
    .catch(err => console.log(err))
    }
    getData()
  }, [])

  return (
    <div>
      <div  id={openPopup ? 'blur' : ''}>
          <Header />
          <GamePeriod />
      </div>
      {openPopup && (
        <div className='popup'>
        <AddAmountPopup />
        </div>
      )}
    </div>
  )
}

export default UserHome