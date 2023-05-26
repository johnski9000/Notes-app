import React  from 'react'

function MenuItem({props, handleClick, state}) {
  const {collections} = state.userData.userData
  
  function ItemCount() {
    if (props.name === "Today") {
      return (
        <div className="itemCount">
          {collections.TasksToday.length}
        </div>
      )
    }
  }
  ItemCount()
  
  return (
    <li onClick={() => handleClick(props.name)}>
    <img src={props.image} alt="upcoming" />
    {props.name}
    {ItemCount()}
  </li>
  )
}

export default MenuItem