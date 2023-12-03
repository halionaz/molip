import styles from "./LeftSidebar.module.css";

import { GoArchive, GoHistory, GoSearch } from "react-icons/go";
import TreeExplorer from "./Explorer/TreeExplorer";
import AddPageBtn from "../Button/PageBtn/AddPageBtn";
import uid from "../utility/uid";
import { useRouter } from "next/navigation";

const LeftSidebar = ({ pid, pagesList, fetchPagesList }) => {

    const router = useRouter();

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
                      parentsPID: null,
                  }
                : {
                      type: "folder",
                      title: "새 폴더",
                      parentsPID: null,
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

    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <div className={styles.bars}>
                    <div className={styles.mainBar}>
                        <div
                            className={[
                                styles.mainBarComponent,
                                styles.selected,
                            ].join(" ")}
                        >
                            <GoArchive className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoSearch className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoHistory className={styles.mainBarBtn} />
                        </div>
                    </div>
                    <div className={styles.subBar}>
                        <div className={styles.global}>
                            <AddPageBtn
                                type={"page"}
                                visible={true}
                                AddPage={AddPage}
                            />
                            <AddPageBtn
                                type={"folder"}
                                visible={true}
                                AddPage={AddPage}
                            />
                        </div>
                        <TreeExplorer
                            pid={pid}
                            node={null}
                            data={pagesList}
                            fetchPagesList={fetchPagesList}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default LeftSidebar;
