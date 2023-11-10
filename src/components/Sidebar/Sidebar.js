import styles from "./Sidebar.module.css";

import { VscFiles, VscSearch, VscGitCommit } from "react-icons/vsc";

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <h1 className={styles.molip}>💭 mol.ip</h1>
            <div className={styles.bars}>
                <div className={styles.mainBar}>
                    <VscFiles className={styles.mainBarBtn} />
                    <VscSearch className={styles.mainBarBtn} />
                    <VscGitCommit className={styles.mainBarBtn} />
                </div>
                <div className={styles.subBar}>
                    <div>lorem</div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
