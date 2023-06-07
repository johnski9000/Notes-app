import React  from 'react'

function MenuItem({props, handleClick, state}) {
  const {collections} = state ? state.userData.userData : 0
  
  function ItemCount() {
    if (props.name === "Today") {
      return (
        <div className="itemCount">
          {collections ? collections.TasksToday.length : "0"}
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