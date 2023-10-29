import React, { useState, useEffect } from 'react'
import '../../../../static/win/result/parity/result.css'
import { AiFillTrophy } from 'react-icons/ai'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

function Result(props) {
    const { recordName, recordData } = props
    const [showResult, setShowResult] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [maxPage] = useState(Math.ceil(recordData.length / 10))
    let newData= []
    useEffect(() => {
        let maxIndex = 10 * pageNum
        let minIndex = maxIndex - 10
         newData = Array.from(new Set([...recordData]))
        let splicedData = newData.slice(minIndex, maxIndex)
        // console.log("splicedData", splicedData, minIndex, maxIndex, pageNum, recordData)
        
        // console.log('newddatat is', newData,minIndex, maxIndex, pageNum, recordData)
        setShowResult([...splicedData])
    }, [pageNum, recordData])

    function result_clr(num) {
        switch (num) {
            case 1: return 'green'
            case 2: return 'red'
            case 3: return 'green'
            case 4: return 'red'
            case 5: return 'viogreen'
            case 6: return 'red'
            case 7: return 'green'
            case 8: return 'red'
            case 9: return 'green'
            case 0: return 'viored'
            default: return ''
        }
    }

    function incPageNum() {
        console.log("inc", pageNum, maxPage,Math.ceil(recordData.length / 10))
        pageNum < maxPage && setPageNum(pageNum + 1)
    }
    function decPageNum() {
        console.log("dec", pageNum)
        pageNum > 1 && setPageNum(pageNum - 1)
    }

    return (
        <div className='result'>
            <div className='result_cont'>
                <p className='text-center result_name'><AiFillTrophy />{recordName} Record</p>
                <div className='resut_record parity_result'>
                    <table className=''>
                        <thead >
                            <tr className='d-flex justify-content-between w-100 align-items-center'>
                                <th>Period</th>
                                <th>Price</th>
                                <th>Number</th>
                                <th className='px-4'>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showResult && showResult.map((item, key) => {
                                return (
                                    <tr key={key} className='d-flex flex-row justify-content-between w-100 align-items-center'>
                                        <td>{item.period_num}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.winNum}</td>
                                        <td className='px-5 text-center'><p className={result_clr(item.winNum) + '_result'}></p></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='pagination'> 
                    <div className='pagination_cont d-flex'>
                        <div className='page_nums'>
                            <p className='page_num'>{`${10 * pageNum - 9}-${10 * pageNum} of ${recordData.length}`}</p>
                        </div>
                        <div className='pagination_btns'>
                            <BsFillArrowLeftCircleFill onClick={decPageNum} />
                            <BsFillArrowRightCircleFill onClick={incPageNum} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result