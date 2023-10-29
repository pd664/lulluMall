import React from 'react'
import Result from './Result'
import History from './History'

function commonTemplate(props) {
  const {recordName, recordData} = props
  
  return (
    <div>
        <Result recordName={recordName} recordData={recordData} />
        <History />
    </div>
  )
}

export default commonTemplate