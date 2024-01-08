import React from "react";
import add from "../../Pages/Dashboard/media/addblue.png";
import { apiURLLocal } from "../../Variables/const";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function CreateNote() {
  const auth = useAuth();
  console.log(auth.currentUser.email);
  const CreateNoteFunction = () => {
    console.log("Create Note");
    try {
      axios
        .put(apiURLLocal + "/notes/create", { email: auth.currentUser.email })
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
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
