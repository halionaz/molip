import styles from "./Sidebar.module.css";

import { VscFiles, VscSearch, VscGitCommit } from "react-icons/vsc";
import { GoArchive, GoFile, GoHistory, GoSearch } from "react-icons/go";

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <div className={styles.bars}>
                <div className={styles.mainBar}>
                    <GoArchive className={styles.mainBarBtn} />
                    <GoSearch className={styles.mainBarBtn} />
                    <GoHistory className={styles.mainBarBtn} />
                </div>
                <div className={styles.subBar}>
                    <div className={styles.file}>
                        <GoFile className={styles.fileIcon} />
                        <span className={styles.fileName}>테스트 문서</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
