import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button
      className='square'
      onClick={onSquareClick}
    >{value}
    </button>

  );
}
function calculateWinner(squares) {
  const lines = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [[ax,ay], [bx,by], [cx,cy]] = lines[i];
    if (squares[ax][ay] && squares[ax][ay] === squares[bx][by] && squares[ax][ay] === squares[cx][cy]) {
      return squares[ax][ay];
    }
  }

  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(x,y) {
    if (squares[x][y] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.map(row => row.slice());
    if(xIsNext){
      nextSquares[x][y] = "X";
    } else {
      nextSquares[x][y] = "O";
    }
    onPlay(nextSquares);    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0][0]} onSquareClick={() => handleClick(0,0)} />
        <Square value={squares[0][1]} onSquareClick={() => handleClick(0,1)} />
        <Square value={squares[0][2]} onSquareClick={() => handleClick(0,2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[1][0]} onSquareClick={() => handleClick(1,0)} />
        <Square value={squares[1][1]} onSquareClick={() => handleClick(1,1)} />
        <Square value={squares[1][2]} onSquareClick={() => handleClick(1,2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[2][0]} onSquareClick={() => handleClick(2,0)} />
        <Square value={squares[2][1]} onSquareClick={() => handleClick(2,1)} />
        <Square value={squares[2][2]} onSquareClick={() => handleClick(2,2)} />
      </div>
    </>
  );
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array.from({ length: 3 }, () => Array(3).fill(null))]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    }


  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
  );
}
