import {Chessboard} from 'react-chessboard';
import {useEffect, useRef, useState} from 'react';
import {Chess} from 'chess.js';
import axios from 'axios';
import './App.css';


function Game() {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [response, setResponse] = useState(null);

  var uri = 'http://localhost:8080/'
  useEffect(() => {
    if(response === null){
      getData();
    }else if(response.side == "WHITE"){
      console.log("Black's move")
      makeRandomMove();
    }
  }, [response])

  const getData = () => {
    axios.get(uri, {params: {fen: game.fen(), depth: 3}}).then(
      (resp) => {
        console.log(resp.data)
        setResponse(resp.data);
      }
    )
  }
  
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    console.log(response)
    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(response.move, {sloppy: true});
    });
    getData();
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    getData()
    // illegal move
    if (move === null) return false;
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });
    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    
    return true;
  }

  function onMouseOverSquare(square) {
    getMoveOptions(square);
  }

  // Only set squares to {} if not already set to {}
  function onMouseOutSquare() {
    if (Object.keys(optionSquares).length !== 0) setOptionSquares({});
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) {
      return;
    }
    
    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
  }

  function onSquareClick() {
    setRightClickedSquares({});
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  return (
    <div className='App'>
      
      <Chessboard
        id="SquareStyles"
        arePremovesAllowed={true}
        animationDuration={200}
        position={game.fen()}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
        customSquareStyles={{
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares
        }}
        ref={chessboardRef}
      />
      <div>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
          setMoveSquares({});
          setRightClickedSquares({});
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
          setMoveSquares({});
        }}
      >
        undo
      </button>
      </div>
    </div>
  );
}

export default Game;
