import React, { useRef, useState } from "react";
import image from "./deleted.png";
import check from "./check.png";
import { useAuth } from "../../Context/AuthContext";
import { useDispatch } from "react-redux";
import { useDeleteNote, useUpdateNote } from "./functions";

function StickyNote({ props }) {
  const [selected, setSelected] = useState(false);
  const auth = useAuth();
  const contentEditableRef = useRef(null);
  const dispatch = useDispatch();
  const DeleteNote = () => {
    try {
      useDeleteNote({
        id: props.id,
        email: auth.currentUser.email,
        dispatch: dispatch,
      })
        .then((res) => {
          console.log(res);
          // Handle the response here if needed
        })
        .catch((error) => {
          console.log(error);
          // Handle the error here if needed
        });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateNote = () => {
    const data = {
      title: contentEditableRef.current.children[2].innerText,
      body: contentEditableRef.current.children[3].innerText,
    };
    const id = props.id;
    const email = auth.currentUser.email;
    useUpdateNote((props = { id, email, data }))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
            DeleteNote();
          }}
        />
        {selected && (
          <img
            src={check}
            alt="Update"
            className="w-8 h-8 absolute right-[5px] bottom-[10px] hover:cursor-pointer "
            onClick={() => {
              UpdateNote();
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
