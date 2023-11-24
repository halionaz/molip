import Link from "next/link";

import styles from "./PageBtn.module.css";
import AddPageBtn from "@/components/Button/AddPageBtn";
import { GoFileDirectory } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";

import uid from "@/components/utility/uid";

const PageBtn = ({ data, pid, fetchPagesList }) => {
    const router = useRouter;
    const [hover, setHover] = useState(false);

    const mouseOverHandler = () => {
        setHover(true);
    };
    const mouseOutHandler = () => {
        setHover(false);
    };

    const AddPage = (type) => {
        const newBody =
            type === "page"
                ? {
                      type: type,
                      emoji: "",
                      title: "",
                      // 첫 블럭
                      content: JSON.stringify([
                          {
                              id: uid(),
                              tag: "p",
                              html: "",
                          },
                      ]),
                      parentsPID: data._id,
                  }
                : {
                      type: type,
                      title: "",
                  };
        fetch("http://localhost:3001/pages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newBody,
            }),
        }).then((val) => {
            console.log(val);
            fetchPagesList();
            // router.
        });
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
                    <AddPageBtn type={"page"} hover={hover} AddPage={AddPage} />
                    <AddPageBtn
                        type={"folder"}
                        hover={hover}
                        AddPage={AddPage}
                    />
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
                <AddPageBtn type={"page"} hover={hover} AddPage={AddPage} />
                <AddPageBtn type={"folder"} hover={hover} AddPage={AddPage} />
            </div>
        );
    }
};

export default PageBtn;
