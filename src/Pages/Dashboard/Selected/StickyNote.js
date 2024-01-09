import React, { useRef, useState } from "react";
import image from "../media/deletered.png";
import check from "../media/check.png";
import axios from "axios";
import { apiURL, apiURLLocal } from "../../../Variables/const";
import { useAuth } from "../../../Context/AuthContext";

function StickyNote({ props }) {
  const [selected, setSelected] = useState(false);
  const auth = useAuth();
  const contentEditableRef = useRef(null);
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
  const updateNote = () => {
    console.log("Update Note");
    console.log(contentEditableRef.current.children[2].innerText);
    axios.put(apiURLLocal + "/notes/update", {
      email: auth.currentUser.email,
      id: props.id,
      data: {
        title: contentEditableRef.current.children[2].innerText,
        body: contentEditableRef.current.children[3].innerText,
      },
    });
  };

  const handleContentChange = () => {
    const isSelected = document.activeElement === contentEditableRef.current;

    if (isSelected) {
      console.log("Contenteditable is selected");
      setSelected(true);
    } else {
      console.log("Contenteditable is not selected");
      setSelected(false);
    }
  };
  return (
    <li>
      <a
        href="#"
        ref={contentEditableRef}
        contenteditable="true"
        className="relative"
        onInput={(e) => handleContentChange(e)}
      >
        <img
          src={image}
          alt="Delete"
          className="w-8 h-8 absolute right-[5px] top-[10px] hover:cursor-pointer "
          onClick={() => {
            deleteNote();
          }}
        />
        {selected && (
          <img
            src={check}
            alt="Update"
            className="w-8 h-8 absolute right-[5px] bottom-[10px] hover:cursor-pointer "
            onClick={() => {
              updateNote();
            }}
          />
        )}
        <h2
          className="pb-2 font-bold text-l"
          onChange={(e) => handleContentChange(e)}
        >
          {props.title}
        </h2>
        <p onChange={(e) => handleContentChange(e)}>{props.body}</p>
      </a>
    </li>
  );
}

export default StickyNote;
