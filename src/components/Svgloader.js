import React from 'react'
import Loader from './Resource/spinner.svg'
import './svgloader.css'
function Svgloader() {
  return (
    <div>
        <img className='loader' src={Loader} alt="" />
    </div>
  )
}

export default Svgloader