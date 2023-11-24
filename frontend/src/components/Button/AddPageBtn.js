import styles from "./AddPageBtn.module.css";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

const AddPageBtn = ({ type, hover, AddPage }) => {
    return (
        <div
            className={styles.btn}
            style={{ visibility: hover ? "visible" : "hidden" }}
            onClick={()=>{
                AddPage(type);
            }}
        >
            {type === "page" ? <VscNewFile /> : <VscNewFolder />}
        </div>
    );
};

export default AddPageBtn;
