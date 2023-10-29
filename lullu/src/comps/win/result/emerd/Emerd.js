import React, { useState, useEffect } from 'react'
import CommonTemplater from '../commonTemplate/CommonTemplate'
import { socket } from '../../../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { emerdCurrData } from '../../../../reduxComps/action/getPrevData'

function Emerd() {
  const seconds = useSelector((state) => state.changeSecond)
  const prevResult = useSelector((state) => state.emerdPrevResult)
  const [result, setResult] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (result.length == 0 || seconds <= 1) {
      setResult([...prevResult.result])
    }
  }, [seconds, prevResult])

  socket.once("emerd_result", async (arg) => {
    await dispatch(emerdCurrData(arg))
    return socket.off('emerd_result');
  })

  return (
    <div>
      <CommonTemplater recordName={'Emerd'} recordData={result} />
    </div>
  )
}

export default Emerd