import {React, useContext } from 'react'
import '../../styles/popup.css'
import Win from './Win'
import Restart from './Restart'
import { PopupContext } from '../../context/PopupContext'

const PopUp = () => {
  const {show, mode} = useContext(PopupContext)
  // const {mode, showPopup} = useContext(PopupContext)
  // console.log(show)
  // console.log(useContext(PopupContext))
  return (
    <>
      {show && (
        <div className='popup'>
          <div className='content'>
            {mode === 'winner' && <Win />}
            {mode === 'start' && <Restart />}
          </div>
        </div>
      )}
    </>
  )
}

export default PopUp
