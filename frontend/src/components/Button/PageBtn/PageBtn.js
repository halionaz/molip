import Link from "next/link";

import styles from "./PageBtn.module.css";
import AddPageBtn from "@/components/Button/PageBtn/AddPageBtn";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";

import uid from "@/components/utility/uid";
import DeletePageBtn from "./DeletePageBtn";

const PageBtn = ({ curNode, pid, data, fetchPagesList }) => {
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
                      parentsPID: curNode._id,
                  }
                : {
                      type: "folder",
                      title: "새 폴더",
                      parentsPID: curNode._id,
                  };
        fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
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

    const DeletePage = (pid = curNode._id) => {
        // DFS를 통한 자식 페이지들 삭제
        const childNodes = data.filter((node) => node.parent_ID === pid);
        childNodes.forEach((child)=>{
            DeletePage(child._id);
        })
        // 페이지 삭제
        fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pid}`, {
            method: "DELETE",
        }).then(() => {
            fetchPagesList();
        });
    };

    if (curNode.type === "page") {
        return (
            <Link href={`/p/${curNode._id}`}>
                <div
                    className={[
                        styles.file,
                        curNode._id === pid ? styles.thisFile : null,
                    ].join(" ")}
                    onMouseOver={mouseOverHandler}
                    onMouseOut={mouseOutHandler}
                >
                    <div className={styles.fileIcon}>
                        {curNode.emoji ? curNode.emoji : <GoFile />}
                    </div>
                    <span className={styles.fileName}>
                        {curNode.title ? curNode.title : "제목 없음"}
                    </span>
                    <DeletePageBtn hover={hover} DeletePage={DeletePage} />
                    <AddPageBtn
                        type={"page"}
                        visible={hover}
                        AddPage={AddPage}
                    />
                    <AddPageBtn
                        type={"folder"}
                        visible={hover}
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
                <span className={styles.fileName}>{curNode.title}</span>
                <DeletePageBtn hover={hover} DeletePage={DeletePage} />
                <AddPageBtn type={"page"} visible={hover} AddPage={AddPage} />
                <AddPageBtn type={"folder"} visible={hover} AddPage={AddPage} />
            </div>
        );
    }
};

export default PageBtn;
