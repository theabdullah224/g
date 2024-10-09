import React from 'react'
import './Reciptcomp.css'
function Reciptcomp(props) {
  return (
    <div className='Reciptcomp'>
        <div className="lefticonrec ">
            <img className='mt-6 w-16 sm:w-36' src={props.ricon} alt="" />
        </div>
        <div className="righttext">
            <h3 className='rh3recipt text-xl font-bold'>{props.title}</h3>
            <p className='rprecipt text-lg'>{props.description}</p>

        </div>
    </div>
  )
}

export default Reciptcomp
