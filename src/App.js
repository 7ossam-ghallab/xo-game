import Start from "./components/Start/Start";
import { useContext } from "react";
import Board from "./components/Board/Board";
import PopUp from "./components/pop-up/PopUp";
import { GameContext } from "./context/GameContext";

function App() {
  const { screen } = useContext(GameContext)
  // console.log(screen)
  return (
    <div className="App">
      <div className="container">
        {screen === 'start' && <Start />}
        {screen === 'game' && <Board />}
      </div>
      <PopUp />
    </div>
  );
}

export default App;
