import React, {useState, useEffect} from 'react'
import '../../../static/win/gamePeriod/addAmountPopup.css'
import { useSelector,useDispatch } from 'react-redux';
import { changepopUp } from '../../../reduxComps/action/index'
import axios from 'axios';
import { getUser } from '../../../utils/Common'

function AddAmountPopup(props) {
    const user = getUser()
    const { selectedPlay, onClickNum, playNumber } = props
    const dispatch = useDispatch()
    const playNum = useSelector((state) => state.playNumber)
    const playCol = useSelector((state) => state.playColor)
    const gameName = useSelector((state) => state.gameName)
    const [amtArray] = useState([10,100,1000,10000])
    const [selectedAmt, setSelectedAmt] = useState(10)
    const [number, setNumber] = useState(1)
    const [totalAmt, setTotalAmt] = useState(0)


    useEffect(() => {
        setTotalAmt(selectedAmt * number)
    },[selectedAmt, number, selectedAmt])

    function changeAmt(amt)  {
        setSelectedAmt(amt)
    }

    function increment() {
        setNumber(number+1)
    }

    function decrement() {
        number > 0 ? setNumber(number - 1) : setNumber(0)
    }

    function closePopUp() {
        dispatch(changepopUp())
    }

    function confirmAmt() {
        user['total_amount'] = totalAmt
        playNum !== -1 ? (axios.post('/bet', {
            number: playNum,
            totalAmt: totalAmt,
            user: user,
            gameName:gameName
        })
        .then((res) => console.log("res is", res ))
        .catch((err) => console.log("err is", err))) : (
            axios.post('/colorBet', {
            color: playCol,
            totalAmt: totalAmt,
            user: user,
            gameName:gameName
        })
        .then((res) => console.log("res is", res ))
        .catch((err) => console.log("err is", err))
        )
        closePopUp()
    }

  return (
    <div className='addAmountPopup'>
        <div className='addAmtpop_cont'>
            <div className='selected_num d-flex justify-content-center align-items-center bg-primary text-white h-5'>
                <p className='select_cont p-sec'>Select 5</p>
            </div>
            <div className='addAmt_body px-3 py-2'>
                <p className='p-sec'>Contract Money</p>
                <div className='add_amt_qty d-flex'>
                    {amtArray.map((amt, key) => {
                        return (
                            <div className='add_amount' key={key}>
                                <button className='amt_qty' onClick={() => changeAmt(amt)}>{amt}</button>
                            </div>
                        )
                    })}
                </div>

                <div className='addAmt_number'>
                    <div className='d-flex'>
                        <p className='p-sec'>Number</p>
                        <div className='number_change d-flex border border-secondary mx-3 p-0 align-items-center'>
                            <div className='increment'>
                                <button onClick={decrement} className='number_btn decrement'>-</button>
                            </div>
                            <div className='number text-center'>
                            <p className='number_cont'>{number}</p>
                            </div>
                            <div className='decrement text-center'>
                                <button onClick={increment} className='number_btn increment'>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='total_amt text-center py-3'>
                    <p className='p-sec'>Total contract money is {totalAmt}</p>
                </div>

                <div className='policies px-3'>
                    <div className='agree'>
                        <p className=''>&#x2705; I agree <span className='text-primary'> PRESALE RULE</span></p>
                    </div>
                    <div className='privacy'>
                        <p></p>
                    </div>
                </div>   
            </div>
            <div className='addAmt_footer border-top '>
                <div className='addAmt_footer_btns d-flex justify-content-end py-2'>
                    <div className='addAmt_footer_btn px-3'>
                        <button className='add_amt_footer_btn add_amt_close' onClick={() => closePopUp()}>CLOSE</button>
                    </div>
                    <div className='addAmt_footer_btn'>
                        <button className='add_amt_footer_btn add_amt_confirm text-primary' onClick={() => confirmAmt()}>CONFIRM</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddAmountPopup