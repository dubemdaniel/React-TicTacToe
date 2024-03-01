import React from 'react'
import { useState } from 'react'
import Square from './Square'

const InitialGameState: string[] = ["", "", "", "", "", "", "", "", ""]


const Game = () => {
    const [game, setGame] = useState(InitialGameState)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    
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
      <div className='h-screen p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-400'>
          <h1 className='text-center text-5xl mb-4 text-white font-display'>
          Tic Tac Toe
          </h1>
          <div className='grid grid-cols-3 gap-3 mx-auto '>
              {game.map((player, index) => (
                  <Square key={index} {...{index, player }} onClick={ handleCellClick} />
                   
              ))}
          </div>

          <div>Score goes here</div>
      
      </div>
  )
}

export default Game