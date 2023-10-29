import React, { useEffect, useState } from 'react'
import CommonTemplater from '../commonTemplate/CommonTemplate'
import { socket } from '../../../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { parityCurrData } from '../../../../reduxComps/action/getPrevData'
function Parity() {
    const seconds = useSelector((state) => state.changeSecond)
    const prevResult = useSelector((state) => state.parityPrevResult)
    const [result, setResult] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        if (result.length == 0 || seconds <= 1) {
            setResult([...prevResult.result])
        }
    }, [seconds, prevResult])

    socket.once("parity_result", async (arg) => {
        console.log("pasrity arg", arg)
        await dispatch(parityCurrData(arg))
        return socket.off('parity_result');
    })

    return (
        <div>
            <CommonTemplater recordName={'Parity'} recordData={result} />
        </div>
    )
}

export default Parity