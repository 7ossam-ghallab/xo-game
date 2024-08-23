import React, { useContext } from 'react'
import Xicon from '../icons/Xicon'
import Oicon from '../icons/Oicon'
import '../../styles/start.css'
import { GameContext } from '../../context/GameContext'

const Start = () => {
  const {activeUser,
    setActiveUser,
    changePlayMode} = useContext(GameContext)

  return (
    <div className='start'>
      <div className='start__header'>
        <Xicon />
        <Oicon />
      </div>
      <div className='card shadow-gray'>
        <h1 className='text-lg'>pick player 1's mark</h1>

        <div className='start__players'>
          <span className={activeUser === 'x' ? 'start__players--active' : ''} onClick={() => setActiveUser("x")}>
            <Xicon color={activeUser === 'x' ? 'dark' : 'light'}/>
          </span>
          <span className={activeUser === 'o' ? 'start__players--active' : ''} onClick={() => setActiveUser("o")}>
            <Oicon color={activeUser === 'o' ? 'dark' : 'light'}/>
          </span>
        </div>
        <p className='text-light'>remember : x goes first</p>
      </div>

      <div className='start__btns'>
        <button onClick={() => changePlayMode('cpu')} className='btn btn-yellow'>new game (vs cpu)</button>
        <button onClick={() => changePlayMode('user')} className='btn btn-blue'>new game (vs player)</button>
      </div>
    </div>
  )
}

export default Start
