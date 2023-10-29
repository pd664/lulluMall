import React, { useEffect, useState } from 'react'
import CommonTemplater from '../commonTemplate/CommonTemplate'
import { socket } from '../../../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { sapreCurrData } from '../../../../reduxComps/action/getPrevData'

function Spare() {
  const dispatch = useDispatch();
  const seconds = useSelector((state) => state.changeSecond)
  const [result, setResult] = useState([])
  const prevResult = useSelector((state) => state.saprePrevResult)

  useEffect(() => {
    if (result.length == 0 || seconds <= 1) {
      setResult([...prevResult.result])
    }
  }, [seconds, prevResult])

  socket.once("sapre_result", async (arg) => {
    await dispatch(sapreCurrData(arg))
    return socket.off('sapre_result');
  })

  return (
    <div>
      <CommonTemplater recordName={'Sapre'} recordData={result} />
    </div>
  )
}

export default Spare