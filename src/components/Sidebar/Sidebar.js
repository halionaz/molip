import styles from "./Sidebar.module.css";

import { VscFiles, VscSearch, VscGitCommit } from "react-icons/vsc";
import { GoArchive, GoFile, GoHistory, GoSearch } from "react-icons/go";

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <h1 className={styles.molip}>💭 mol.ip</h1>
            <div className={styles.bars}>
                <div className={styles.mainBar}>
                    <GoArchive className={styles.mainBarBtn} />
                    <GoSearch className={styles.mainBarBtn} />
                    <GoHistory className={styles.mainBarBtn} />
                </div>
                <div className={styles.subBar}>
                    <div className={styles.file}>
                        <GoFile className={styles.fileIcon} />
                        <span className={styles.fileName}>lorem</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
