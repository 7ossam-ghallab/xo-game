import React, {useContext} from 'react'
import { GameContext } from '../../context/GameContext'
import { PopupContext } from '../../context/PopupContext'

  const Restart = () => {

  const {handelRestart} = useContext(GameContext)
  const {hidePopup} = useContext(PopupContext)


  return (
    <div className='restart'>
      <h2 className='restart__title'>restart game?</h2>
      <div className='restart__btns'>
        <button className='btn btn-sm' onClick={hidePopup}>no, cancel</button>
        <button className='btn btn-sm btn-yellow' onClick={handelRestart}>yes, restart</button>
      </div>
    </div>
  )
}

export default Restart
