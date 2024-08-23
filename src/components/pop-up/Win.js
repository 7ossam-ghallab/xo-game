import React, { useContext } from 'react'
import Xicon from '../icons/Xicon'
import { GameContext } from '../../context/GameContext'
import Oicon from '../icons/Oicon'

const Win = () => {
  const {winner, handelQuit, handelNextRound} = useContext(GameContext)
  return (
    <div className='score'>
      {winner && winner !== 'draw' ? (
        <>
          <p>you win</p>
          <h2 className={`score__title ${winner === 'o' ? 'text-yellow' : "text-blue"}`}>
            {winner === 'x' ? <Xicon /> : <Oicon/>} Takes the round
          </h2>
        </>
      ) : (
        <>
          <h2 className='score__title' style={{marginTop: 0}}>
            No Winner
          </h2>
        </>
      )}
      <div className='score__btns'>
        <button className='btn btn-sm' onClick={handelQuit}>quit</button>
        <button className='btn btn-sm btn-yellow' onClick={handelNextRound}>next round</button>
      </div>
    </div>
  )
}

export default Win
