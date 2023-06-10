// import React from 'react'

interface Props{
    num: number;
    heading: string;
    onButtonClick: (heading:string)=>void;
}

function SmallTile({num,heading,onButtonClick}:Props) {
  return (
    <>
    <button className="tile" onClick={()=>onButtonClick(heading)}>
        <h1>{num}</h1>
    
        <p>{heading}</p>
 
    </button>
    </>
  )
}

export default SmallTile