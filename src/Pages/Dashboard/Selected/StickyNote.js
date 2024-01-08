import React from "react";
import image from "../media/deletered.png";
import axios from "axios";
import { apiURL, apiURLLocal } from "../../../Variables/const";
import { useAuth } from "../../../Context/AuthContext";

function StickyNote({ props }) {
  const auth = useAuth();
  const deleteNote = () => {
    console.log("Delete Note");
    axios
      .put(apiURLLocal + "/notes/delete", {
        email: auth.currentUser.email,
        id: props.id,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  return (
    <li>
      <a href="#" contenteditable="true" className="relative">
        <img
          src={image}
          alt="Delete"
          className="w-8 h-8 absolute right-[5px] top-[10px] hover:cursor-pointer "
          onClick={() => {
            deleteNote();
          }}
        />
        <h2 className="pb-2 font-bold text-l">{props.title}</h2>
        <p>{props.body}</p>
      </a>
    </li>
  );
}

export default StickyNote;
