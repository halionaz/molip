import Link from "next/link";

import styles from "./PageBtn.module.css";
import AddPageBtn from "@/components/Button/PageBtn/AddPageBtn";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";

import uid from "@/components/utility/uid";
import DeletePageBtn from "./DeletePageBtn";

const PageBtn = ({ data, pid, fetchPagesList }) => {
    const router = useRouter();
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
                      type: "page",
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
                      type: "folder",
                      title: "새 폴더",
                      parentsPID: data._id,
                  };
        fetch("http://localhost:3001/pages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(newBody),
        })
            .then((val) => {
                return val.json();
            })
            .then((val) => {
                if (val.type === "page") {
                    // 페이지가 생성된거라면 리다이렉트
                    router.push(`/p/${val._id}`);
                } else {
                    fetchPagesList();
                }
            });
    };

    const DeletePage = () => {
        fetch(`http://localhost:3001/pages/${data._id}`, {
            method: "DELETE",
        }).then(() => {
            fetchPagesList();
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
                    <div className={styles.fileIcon}>
                        {data.emoji ? data.emoji : <GoFile />}
                    </div>
                    <span className={styles.fileName}>
                        {data.title ? data.title : "제목 없음"}
                    </span>
                    <DeletePageBtn hover={hover} DeletePage={DeletePage} />
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
                <DeletePageBtn hover={hover} DeletePage={DeletePage} />
                <AddPageBtn type={"page"} hover={hover} AddPage={AddPage} />
                <AddPageBtn type={"folder"} hover={hover} AddPage={AddPage} />
            </div>
        );
    }
};

export default PageBtn;
