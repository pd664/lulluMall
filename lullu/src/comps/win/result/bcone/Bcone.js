import React, {useState,useEffect} from 'react'
import CommonTemplater from '../commonTemplate/CommonTemplate'
import { socket } from '../../../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { bconeCurrData } from '../../../../reduxComps/action/getPrevData'

function Bcone() {
  const seconds = useSelector((state) => state.changeSecond)
  const dispatch = useDispatch()
  const prevResult = useSelector((state) => state.emerdPrevResult)

  const [result, setResult] = useState([])
  
  useEffect(() => {
    if(result.length == 0 ||seconds <= 1) {
        setResult([...prevResult.result])
    }
}, [seconds,prevResult])

    socket.once("bcone_result", async (arg) => {
      await dispatch(bconeCurrData(arg))
        return socket.off('bcone_result');
    })

  return (
    <div className='bcone'>
        <CommonTemplater recordName={'Bcone'} recordData={result} />
    </div>
  )
}

export default Bcone