import React from 'react'
import Dice from "./Dice"
import Text from "./text"
import {nanoid}  from "nanoid"

export default function Main() {

    function allNewDice(){
        const randArray = []
        for(let i = 0; i < 10; i++){
            const min = 1;
            const max = 6;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randArray.push({
                randomNumber, 
                isHeld : false,
                id : nanoid() })
        }
        return randArray
    }
    
    const [newDice, setnewDice] = React.useState(allNewDice())

    const [tenzies,setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = newDice.every(dice => dice.isHeld === true)
        const firstValue = newDice[0].value
        const allSamevalue = newDice.every(dice => dice.value === firstValue)
        if(allHeld && allSamevalue){
            setTenzies(true)
        }
    } ,[newDice])

    function diceElements(){
        return newDice.map(item => 
            (< Dice 
                value = {item.randomNumber}  
                isHeld = {item.isHeld} 
                checked = {() => toggleDice(item.id)} 
                key = {item.id} />)
        )
    }

    function toggleDice(id){
        setnewDice(item => item.map(obj => {
            if(id === obj.id){
                if(obj.isHeld === false){
                    return {
                        ...obj,
                        isHeld : true
                    }
                }
            }
            return obj
        }))
    }
        function reroll(){
        setnewDice(item => item.map( num => {
            if(num.isHeld === false){
                const numGenerator = Math.floor(Math.random() * (6 - 1 + 1)) + 1
                return { ...num, randomNumber: numGenerator}
            }
            return num
        }))
    }

    function removeCover(){
        setTenzies(false)
        setnewDice(array => {
            return array.map(item => {
                return {
                    ...item,
                    isHeld : false,
                    randomNumber : Math.floor(Math.random() * (6 - 1 + 1)) + 1
                }
            })
        })
    }

    return ( 
        <>
            <div className='BigContainer'>
                <div className='container'>
                    <Text />
                    <div className='DiceContainer'>
                        {diceElements()}
                    </div>
                    <button className='Roll' onClick={reroll} > 
                        Roll 
                    </button>
                </div>
            </div>
            {
                tenzies &&
                (<div className='winningCover'>
                        <h2 className='gamewon'>
                            Congratulations You Won!
                        </h2> 
                    <button onClick={removeCover}> 
                        Play Again
                    </button>
                </div>)
            }
        </>
    );
}