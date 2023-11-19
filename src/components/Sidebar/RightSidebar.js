import styles from "./RightSidebar.module.css";
import { GoQuestion, GoGear, GoSearch, GoHistory, GoListUnordered } from "react-icons/go";

const RightSidebar = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <header className={styles.header}>
                    <GoQuestion className={styles.headerIcon} />
                    <GoGear className={styles.headerIcon} />
                    <div className={styles.profile}></div>
                </header>
                <div className={styles.bars}>
                    <div className={styles.mainBar}>
                        <div
                            className={[
                                styles.mainBarComponent,
                                styles.selected,
                            ].join(" ")}
                        >
                            <GoListUnordered className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoSearch className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoHistory className={styles.mainBarBtn} />
                        </div>
                    </div>
                    <div className={styles.subBar}>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default RightSidebar;
