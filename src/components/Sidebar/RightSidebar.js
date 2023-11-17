import styles from "./RightSidebar.module.css";
import { GoQuestion, GoGear } from "react-icons/go";

const RightSidebar = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <header className={styles.header}>
                    <GoQuestion className={styles.headerIcon} />
                    <GoGear className={styles.headerIcon} />
                    <div className={styles.profile}></div>
                </header>
                <div className={styles.bars}></div>
            </nav>
        </div>
    );
};

export default RightSidebar;
