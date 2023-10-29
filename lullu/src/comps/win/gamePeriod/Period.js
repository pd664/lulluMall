import React, { useState, useEffect } from 'react'
import '../../../static/win/gamePeriod/period.css'
import { AiFillTrophy } from 'react-icons/ai'
import { socket } from '../../../socket'
import AddAmountPopup from './AddAmountPopup'
import { useSelector, useDispatch } from 'react-redux';
import { changepopUp, playNumber, playColor, seconds } from '../../../reduxComps/action/index'

function Period() {
    const dispatch = useDispatch()
    const [countDownTime, setCountDownTime] = useState('')
    const [countDownSeconds, setCountDownSeconds] = useState(60)
    const [disabled, setDisabled] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const popup = useSelector((state) => state.popUpState)

    useEffect(() => {
        setOpenPopup(popup)
    }, [popup])

    useEffect(() => {
        const time = setInterval(async () => {
            if (countDownSeconds < 1) {
                try {
                    await setCountDownSeconds(Number(60))
                    setDisabled(false)
                }
                catch (e) {
                    console.log("errrrrrr", e)
                }
            }
            else if (countDownSeconds <= 30 && countDownSeconds >= 0) {
                setDisabled(true)
                setCountDownSeconds(countDownSeconds - 1)
            }
            else {
                setCountDownSeconds(countDownSeconds - 1)

            }
            dispatch(seconds(countDownSeconds))
            countDownTimer()
            // countDownTimer()
            // return () => clearInterval(time)
        }, 1000)
        return () => clearInterval(time)
    }, [countDownSeconds, disabled])


    socket.on("timer", (arg) => {
        dispatch(seconds(arg))
        setCountDownSeconds(arg)
    });

    function onClickColor(color) {
        dispatch(changepopUp())
        dispatch(playNumber(-1))
        dispatch(playColor(color))
    }

    async function onClickNumber(num) {
        dispatch(playColor(''))
        dispatch(playNumber(num))
        dispatch(changepopUp())

    }

    const countDownTimer = () => {
        let minutes = Math.floor(countDownSeconds / 60);
        let seconds = (countDownSeconds % 60);

        setCountDownTime(`${minutes.toString().length == 1 ? '0' + minutes : minutes}:${seconds.toString().length == 1 ? '0' + seconds : seconds}`)
    }
    return (
        <div className='period p-2' >
            <div className='peiod_cont d-flex flex-column'>
                <div className='period_detail d-flex justify-content-between'>
                    <div className='period_no'>
                        <p><AiFillTrophy />Period</p>
                        <p className='period_number p_sub'>202342423234</p>
                    </div>
                    <div className='period_count'>
                        <p>Count Down</p>
                        <p className='p_sub'>{countDownTime}</p>
                    </div>
                </div>
                <div className={disabled ? 'disable period_colors d-flex justify-content-between period_game py-2' : 'period_colors d-flex justify-content-between period_game py-2'}>
                    <button className='period_colors_btn join_green' onClick={() => onClickColor('green')}>Join Green</button>
                    <button className='period_colors_btn join_violet' onClick={() => onClickColor('violet')}>Join Violet</button>
                    <button className='period_colors_btn join_red' onClick={() => onClickColor('red')}>join Red</button>
                </div>
                <div className='period_btns pt-5'>
                    <div className={disabled ? 'disable period_btns_cont period_game d-flex justify-content-between flex-wrap' : 'period_btns_cont period_game d-flex justify-content-between flex-wrap'}>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_red-violet' onClick={() => onClickNumber(0)}>0</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_green' onClick={() => onClickNumber(1)}>1</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_red' onClick={() => onClickNumber(2)}>2</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_green' onClick={() => onClickNumber(3)}>3</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_red' onClick={() => onClickNumber(4)}>4</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_violet_green' onClick={() => onClickNumber(5)}>5</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_red' onClick={() => onClickNumber(6)}>6</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_green' onClick={() => onClickNumber(7)}>7</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_red' onClick={() => onClickNumber(8)}>8</button></div>
                        <div id='period_btn' className='py-2'><button className='period_btn_cont period_green' onClick={() => onClickNumber(9)}>9</button></div>

                    </div>
                </div>
            </div>
            {/* {popup && (
            <div className='popup'>
                <AddAmountPopup playNumber={number} />
            </div>
        )} */}
        </div>
    )
}

export default Period

