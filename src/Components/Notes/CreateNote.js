import React from "react";
import add from "../../Pages/Dashboard/media/addblue.png";
import { apiURLLocal } from "../../Variables/const";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useDispatch } from "react-redux";
import { addNote } from "../../Redux/userSlice";

function CreateNote() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const CreateNoteFunction = () => {
    try {
      axios
        .put(apiURLLocal + "/notes/create", { email: auth.currentUser.email })
        .then((res) => {
          const { note } = res.data;
          console.log(note);
          dispatch(addNote(note));
        });
      // dispatch(addNote());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="h-[10em] w-[10em] flex justify-center items-center m-[1em]  bg-slate-100 shadow-xl rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
      onClick={CreateNoteFunction}
    >
      <div className="flex justify-center items-center w-1/2 h-1/2 border-dashed border-blue-300 border-[1px] rounded-[50%]">
        <img src={add} className="w-1/4 h-1/4" />
      </div>
    </div>
  );
}

export default CreateNote;
