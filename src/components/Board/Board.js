import React, {useContext} from 'react'
import Xicon from '../icons/Xicon'
import Oicon from '../icons/Oicon'
import RestartIcon from '../icons/RestartIcon'
import '../../styles/board.css'
import BoardCard from './BoardCard'
import { GameContext } from '../../context/GameContext'

const Board = () => {
  const {squares, Xnext, ties, winner, winnerLine, playMode, showRestartList, activeUser} = useContext(GameContext)
  return (
    <div className='board'>
      <div className='board__header'>
        <div>
          <Xicon />
          <Oicon />
        </div>
        <div className='board__turn'>
          {!Xnext ? <Xicon color="light" size="sm"/> : <Oicon color="light" size="sm"/>} turn
        </div>
        <div>
          <button className='btn btn-sm board__restart' onClick={showRestartList}>
            <RestartIcon />
          </button>
        </div>
      </div>

      <div className='board__body'>
        {squares.map((element, index) => (
          <BoardCard key={index} index={index} user={element} activ={winner && winnerLine && winnerLine.includes(index)}/>
        ))}
      </div>


      <div className='board__footer'>
        <div className='card bg-blue'>
          <p className='text-light'>{playMode === 'user' ? "x (p1)" : (activeUser === 'x' && playMode === 'cpu' ? "x (you)" : "x (cpu)")}</p>
          <strong className='text-2xl'>{ties.x}</strong>
        </div>
        <div className='card bg-light'>
          <p className='text-light'>ties</p>
          <strong className='text-2xl'>{ties.draw}</strong>
        </div>
        <div className='card bg-yellow'>
          <p className='text-light'>{playMode === 'user' ? "o (p2)" : (activeUser === 'o' && playMode === 'cpu' ? "o (you)" : "o (cpu)")}</p>
          <strong className='text-2xl'>{ties.o}</strong>
        </div>
      </div>
    </div>
  )
}

export default Board
