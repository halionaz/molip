import styles from "./EditPageBtn.module.css";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

const AddPageBtn = ({ type, visible, AddPage }) => {
    return (
        <div
            className={styles.btn}
            style={{ visibility: visible ? "visible" : "hidden" }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                AddPage(type);
            }}
        >
            {type === "page" ? <VscNewFile /> : <VscNewFolder />}
        </div>
    );
};

export default AddPageBtn;
