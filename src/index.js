import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Generate the square boxes 
function Square(props) {
  return (
    <button className="square" 
            aria-disabled={props.isDisabled} 
            onClick={props.onClick} 
            aria-label={props.ariaLabel}>
      {props.value}
    </button>
  );
}
// Output the board and control state
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // Each index is a number of the squares
      xIsNext: true,
    };
  }
/*
*   On each click, it adds the X or O in the state
*   and calculates whose turn it is.
*/
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    const mark = this.state.squares[i]; // Current X or O
    return (
      <Square
        value={mark}
        onClick={() => this.handleClick(i)}
        ariaLabel={'Box Number ' + (i+1) + (mark != null ? ' Marked with ' + mark : '')}
        isDisabled={(mark != null ? 'true' : 'false')}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status" aria-live="polite">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


/*
*  lines[] is a multidimentional array that contains all the game winning combinations.
*  
*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // Indexes a,b,c are the boxes of the board
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Returns an array with the winner either being X or O
    }
  }
  return null; // No winner, return null, game continues
}
