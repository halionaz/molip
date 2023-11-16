import styles from "./RightSidebar.module.css";
import { GoArchive, GoFile, GoHistory, GoSearch } from "react-icons/go";

const RightSidebar = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <header className={styles.header}>
                    <div>도움말</div>
                    <div>설정</div>
                    <div>프로필</div>
                </header>
                <div className={styles.bars}></div>
            </nav>
        </div>
    );
};

export default RightSidebar;
