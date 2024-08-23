const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function clacWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return {
        winner : squares[a], lines : lines[i]
      }
    }
  }
  return null
}

// export function calcBestMove(squares, player) {
//   const getAllDuplicatedCounter = (arr) => {
//     let count = 0;
//     arr.forEach(element => {
//       if(squares[element] === player){
//         count += 1
//       }
//     });
//     return count
//   }

//   const sortedLiens = lines.sort((a,b) => {
//     const aCount = getAllDuplicatedCounter(a)
//     const bCount = getAllDuplicatedCounter(b)
//     return bCount - aCount
//   })

//   for(let i =0; i < sortedLiens.length; i++) {
//     let value = sortedLiens[i].find(el => {
//       if(squares[el] === '') {
//         return el + ""
//       }
//       return null
//     })
//     if(!value) {
//       continue;
//     } else {
//       return +value
//     }
//   }
//   return null
// }

export function calcBestMove(squares, player) {
  const opponent = player === 'x' ? 'o' : 'x';

  // Minimax algorithm with Alpha-Beta Pruning
  const minimax = (newSquares, depth, isMaximizing, alpha, beta) => {
    const winnerInfo = clacWinner(newSquares);
    
    if (winnerInfo) {
      return winnerInfo.winner === player ? 10 - depth : depth - 10;
    }

    if (!newSquares.includes('')) {
      return 0; // Draw
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < newSquares.length; i++) {
        if (newSquares[i] === '') {
          newSquares[i] = player;
          const eval1 = minimax(newSquares, depth + 1, false, alpha, beta);
          newSquares[i] = '';
          maxEval = Math.max(maxEval, eval1);
          alpha = Math.max(alpha, eval1);
          if (beta <= alpha) break; // Alpha-Beta Pruning
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < newSquares.length; i++) {
        if (newSquares[i] === '') {
          newSquares[i] = opponent;
          const eval2 = minimax(newSquares, depth + 1, true, alpha, beta);
          newSquares[i] = '';
          minEval = Math.min(minEval, eval2);
          beta = Math.min(beta, eval2);
          if (beta <= alpha) break; // Alpha-Beta Pruning
        }
      }
      return minEval;
    }
  };

  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === '') {
      squares[i] = player;
      const score = minimax(squares, 0, false, -Infinity, Infinity);
      squares[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}