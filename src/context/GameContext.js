import { React, createContext, useContext, useEffect, useState } from "react";
import { calcBestMove, clacWinner } from "../helper/calcSquares";
import { PopupContext } from './PopupContext'


const GameContext = createContext();


const GameState = (props) => {
  const {showPopup, setMode, hidePopup} = useContext(PopupContext)

  const [screen, setScreen] = useState("start"); // start || game
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [playMode, setPlayMode] = useState("user"); // user || cpu

  const changePlayMode = (mode) => {
    setPlayMode(mode)
    setScreen('game')
  }

  const [squares, setSquares] = useState(new Array(9).fill(''))
  const [Xnext, setXnext] = useState(false)

  const handleSquareClick = (index) => {
    if(squares[index] || winner) {
      return
    }
    const currentUser = Xnext === true ? 'o' : 'x';
    if(playMode === 'cpu' && currentUser !== activeUser){
      return
    }
    let ns = [...squares]
    ns[index] = !Xnext ? 'x' : 'o'

    setSquares(ns)
    setXnext(!Xnext)

    // check winner
    checkWinner(ns)
  }

  const [winner, setWinner] = useState(null)
  const [winnerLine, setWinnerLine] = useState(null)
  const [ties, setTies] = useState({x: 0, o:0, draw : 0})
  
  
  const ties__ = {...ties}
  useEffect(() => {
    checkNoWinner();
    const currentUser = Xnext ? 'o' : 'x'
    if(playMode === 'cpu' && currentUser !== activeUser && !winner) {
      setTimeout(() => {
        cpuNextMove(squares)
      }, 1000)
    }
  }, [Xnext, winner, screen])
  
  const checkNoWinner = () => {
    const moves = squares.filter(sq => sq === '' )
    if(moves.length === 0 && !winner) {
      setWinner("draw")
      ties__['x'] += 0.5
      ties__['o'] += 0.5
      ties__['draw'] += 1
      setTies(ties__)
      showPopup()
      setMode("winner")
      return
    }
  }


  const checkWinner = (ns) => {
    const isWinner =  clacWinner(ns)
    if(isWinner) {
      setWinner(isWinner.winner)
      setWinnerLine(isWinner.lines)
      ties__[isWinner.winner] += 1
      ties__['draw'] += 1
      setTies(ties__)
      showPopup()
      setMode('winner')
      return
    }
  }



  const handelQuit = () => {
    setSquares(new Array(9).fill(''))
    setXnext(false)
    setWinner(null)
    setWinnerLine(null)
    setActiveUser('x')
    setTies({x:0, o:0, draw:0})
    hidePopup()
    setScreen('start')
  }

  const handelNextRound = () => {
    hidePopup()
      setSquares(new Array(9).fill(''))
      setXnext(winner === 'x')
      setWinner(null)
      setWinnerLine(null)
  }

  const handelRestart = () => {
    setSquares(new Array(9).fill(''))
    setXnext(false)
    setWinner(null)
    setWinnerLine(null)
    setActiveUser('x')
    setTies({x:0, o:0, draw:0})
    hidePopup()
  }
  
  const showRestartList = () => {
    showPopup()
    setMode('start')
  }


  const cpuNextMove = (sqrs) => {
    const bestMove = calcBestMove(sqrs, activeUser === 'x' ? 'o' : 'x');
    let ns = [...squares];
    ns[bestMove] = !Xnext ? 'x' : 'o'
    setSquares(ns)
    setXnext(!Xnext)
    checkWinner(ns)
  }

  return (
    <GameContext.Provider
      value={{
        screen,
        activeUser,
        Xnext,
        ties,
        winner,
        winnerLine,
        handelQuit, 
        handelNextRound,
        setActiveUser,
        changePlayMode,
        handleSquareClick,
        handelRestart,
        showRestartList,
        squares,
        playMode
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameState, GameContext };
