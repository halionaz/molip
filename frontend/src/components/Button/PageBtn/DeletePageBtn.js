import { VscTrash } from "react-icons/vsc";
import styles from "./EditPageBtn.module.css";

const DeletePageBtn = ({ hover, DeletePage }) => {
    return (
        <div
            className={styles.btn}
            style={{ visibility: hover ? "visible" : "hidden" }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                DeletePage();
            }}
        >
            <VscTrash />
        </div>
    );
};

export default DeletePageBtn;
