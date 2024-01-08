import styles from "../../Pages/Dashboard/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../Redux/userSlice";

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
        onChange={(e) =>
          dispatch(updateModal({ value: e.target.value, title: "list" }))
        }
      >
        {Lists &&
          Lists.map((item, index) => (
            <option key={index} name="list">
              {item.title}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ListModal;
