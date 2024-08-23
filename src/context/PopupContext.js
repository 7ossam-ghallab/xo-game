import {React, createContext, useState} from 'react'

const PopupContext = createContext()

const PopupState = (props) => {
  
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('winner') // winner || start

  const showPopup = () => setShow(true)
  const hidePopup = () => setShow(false)

  return (
    <PopupContext.Provider value={{show, showPopup, hidePopup, mode, setMode}}>
      {props.children}
    </PopupContext.Provider>
  )
}

export {PopupContext, PopupState}
