import styles from "./LeftSidebar.module.css";

import { GoArchive, GoFile, GoHistory, GoSearch } from "react-icons/go";

const LeftSidebar = ({ pid, pagesList }) => {
    console.log(pid, pagesList);
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
                        {pagesList.map((page, id) => {
                            return (
                                <div key={id} className={[styles.file, (page._id === pid ? styles.thisFile : null)].join(" ")}>
                                    <GoFile className={styles.fileIcon} />
                                    <span className={styles.fileName}>
                                        {page.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default LeftSidebar;
