import React, { useEffect } from 'react'
import { useState } from 'react'
import Square from './Square'

const InitialGameState: string[] = ["", "", "", "", "", "", "", "", ""]

type scores = {
    [key:string]:number
}

const initialScore:scores = {X:0,O:0}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const Game = () => {
    const [game, setGame] = useState(InitialGameState)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [scores, setScores] = useState(initialScore)
    
    useEffect(() => {
      const storedScores = localStorage.getItem("scores")
        if (storedScores) {
            setScores(JSON.parse(storedScores))
        }
    }, [])
    

    useEffect(() => {
        if (game === InitialGameState) {
            return;
        }
        checkForWinner()
    }, [game]);
    
    const resetBoard = () => setGame(InitialGameState)

    const handleWin = () => {
        window.alert(`congrats player ${currentPlayer}! You are the winner`)

        const newPlayerScore = scores[currentPlayer] + 1
        const newScores = { ...scores }
        newScores[currentPlayer] = newPlayerScore
        setScores(newScores)

        localStorage.setItem("scores", JSON.stringify(newScores))

        resetBoard()
    }

    const handleDraw = () => {
        window.alert("The game ended in a draw")

        resetBoard()
    }

    const checkForWinner = () => {
        let roundWon = false

        for (let i = 0; i < winningCombos.length; i++) {
            const winCombo = winningCombos[i];
            
        let a = game[winCombo[0]]
        let b = game[winCombo[1]]
        let c = game[winCombo[2]]

            if ([a, b, c].includes("")) {
                continue
            }
            if (a === b && b === c) {
                roundWon = true
                break;   
            }
        }

        if (roundWon) {
            setTimeout(() => {
                handleWin()
            }, 500);
          
            return
        }
        if (!game.includes("")) {
            handleDraw()
            return
        }

        changePlayer()

    }

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }

    const handleCellClick = (event:any) => {
        const cellIndex = Number(event.target.getAttribute("data-cell-index"))

        const currentValue = game[cellIndex]
        if (currentValue) {
            return 
        }

        const newValues = [...game]
        newValues[cellIndex] = currentPlayer
        setGame(newValues);


        // console.log(currentValue,newValues,currentPlayer,game)
    }
    
  return (
      <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-green-500 to-green-700'>
          <div className='max-w-screen-sm m-auto'>
          <h1 className='text-center text-5xl mb-4 text-white font-display'>
          Tic Tac Toe
          </h1>
          <div className='grid grid-cols-3 gap-3 mx-auto '>
              {game.map((player, index) => (
                  <Square key={index} {...{index, player }} onClick={ handleCellClick} />
                   
              ))}
          </div>

          <div className='mx-auto w-96 text-2xl text-serif text-center'>
              <p className='text-white mt-5'>Next Player: <span>{currentPlayer}</span></p>
              <p className='text-white mt-5'>Player X wins: <span>{scores["X"]}</span></p>
              <p className='text-white mt-5'>Player O wins: <span>{scores["O"]}</span></p>
          </div>
        </div>
      
      </div>
  )
}

export default Game