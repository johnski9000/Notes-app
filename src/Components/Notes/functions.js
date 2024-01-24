import axios from "axios";
import { apiURLLocal } from "../../Variables/const";
import { removeNote } from "../../Redux/userSlice";

export function useDeleteNote(props) {
  return new Promise((resolve, reject) => {
    axios
      .put(apiURLLocal + "/notes/delete", {
        email: props.email,
        id: props.id,
      })
      .then((res) => {
        props.dispatch(removeNote(props.id));
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function useUpdateNote(props) {
  console.log(props);
  return new Promise((resolve, reject) => {
    axios
      .put(apiURLLocal + "/notes/update", {
        email: props.email,
        id: props.id,
        data: props.data,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
