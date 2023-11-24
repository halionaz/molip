import Link from "next/link";

import styles from "./PageBtn.module.css";
import AddPageBtn from "@/components/Button/AddPageBtn";
import { GoFileDirectory } from "react-icons/go";
import { useState } from "react";

const PageBtn = ({ data, pid }) => {
    const [hover, setHover] = useState(false);
    const mouseOverHandler = () => {
        setHover(true);
    };
    const mouseOutHandler = () => {
        setHover(false);
    };
    if (data.type === "page") {
        return (
            <Link href={`/p/${data._id}`}>
                <div
                    className={[
                        styles.file,
                        data._id === pid ? styles.thisFile : null,
                    ].join(" ")}
                    onMouseOver={mouseOverHandler}
                    onMouseOut={mouseOutHandler}
                >
                    <div className={styles.fileIcon}>{data.emoji}</div>
                    <span className={styles.fileName}>{data.title}</span>
                    <AddPageBtn type={"page"} hover={hover} />
                    <AddPageBtn type={"folder"} hover={hover} />
                </div>
            </Link>
        );
    } else {
        // type === "folder"
        return (
            <div
                className={styles.file}
                onMouseOver={mouseOverHandler}
                onMouseOut={mouseOutHandler}
            >
                <GoFileDirectory />
                <span className={styles.fileName}>{data.title}</span>
                <AddPageBtn type={"page"} hover={hover} />
                <AddPageBtn type={"folder"} hover={hover} />
            </div>
        );
    }
};

export default PageBtn;
