import React, {useContext} from "react";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";
import { GameContext } from "../../context/GameContext";

const BoardCard = ({ user = "nouser", activ, index }) => {
  const {handleSquareClick} = useContext(GameContext)
  return (
    <div
      className={`card ${activ && user === "x" && "shadow-blue"} ${
        activ && user === "o" && "shadow-yellow"
      } ${!activ ? "shadow-gray" : 'active'}`
      } onClick={() => handleSquareClick(index)}
    >
      {user === "x" && <Xicon color={activ && "dark"} size="lg" />}
      {user === "o" && <Oicon color={activ && "dark"} size="lg" />}
    </div>
  );
};

export default BoardCard;
