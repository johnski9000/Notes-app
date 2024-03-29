import React from "react";

function MenuItem({ props, handleClick, state }) {
  // const {collections} = state ? state.userData.userData : 0
  // const { collections } = state && state.userData ? state.userData.userData : 0;

  // function ItemCount() {
  //   if (props.name === "Today") {
  //     return (
  //       <div className="itemCount">
  //         {collections.TasksToday ? collections.TasksToday.length : "0"}
  //       </div>
  //     );
  //   }
  // }

  return (
    <li onClick={() => handleClick(props.name)}>
      <img src={props.image} alt="upcoming" />
      {props.name}
      {/* {ItemCount()} */}
    </li>
  );
}

export default MenuItem;
