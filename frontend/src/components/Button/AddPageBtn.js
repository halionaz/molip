import styles from "./AddPageBtn.module.css";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

const AddPageBtn = ({ type, hover }) => {
    return (
        <div
            className={styles.btn}
            style={{ visibility: hover ? "visible" : "hidden" }}
        >
            {type === "page" ? <VscNewFile /> : <VscNewFolder />}
        </div>
    );
};

export default AddPageBtn;
