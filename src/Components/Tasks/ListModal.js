import styles from "../../Pages/Dashboard/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedElement, updateModal } from "../../Redux/userSlice";

function ListModal({ list }) {
  const { Lists } = useSelector((state) => state.userData.userData.collections);
  const dispatch = useDispatch();

  return (
    <div className={styles.tags}>
      <label htmlFor="lists">Choose a list:</label>

      <select
        name="lists"
        id="lists"
        value={list}
        className="border border-solid border-gray-300 rounded-md p-1"
        onChange={(e) =>
          dispatch(updateModal({ value: e.target.value, title: "list" }))
        }
      >
        <option value="none">None</option>
        {Lists &&
          Lists.map((item, index) => (
            <option
              key={index}
              name="list"
              onClick={() => {
                dispatch(setSelectedElement("List" + item.title));
              }}
            >
              {item.title}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ListModal;
