import React from 'react'

function Dice(props) {
    return (
        <h2 className='Dice' 
            style={{ backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" }}
            onClick = {props.checked} >
            {props.value}
        </h2>
    );
}


export default Dice;