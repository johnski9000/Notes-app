import React from 'react'

function MenuItem({props, handleClick}) {
    console.log(props)
  return (
    <li onClick={() => handleClick(props.name)}>
    <img src={props.image} alt="upcoming" />
    {props.name}
  </li>
  )
}

export default MenuItem